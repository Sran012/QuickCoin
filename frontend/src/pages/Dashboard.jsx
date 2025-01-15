
import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar.jsx";
import { Balance } from "../components/Balance.jsx";
import { Users } from "../components/Users.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [bal, setBal] = useState(0);
  const [loading, setLoading] = useState(true); // Ensure loading state to handle async logic
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Immediately set loading to false if no token exists
    if (!userToken) {
      setLoading(false);
      navigate("/signin");  // Redirect to signin
      return;  // Stop further execution
    }

    // Fetch balance only if token exists
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        setBal(response.data.balance);
        setLoading(false); // Stop loading once balance is fetched
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
        setLoading(false);  // Stop loading if an error occurs
        navigate("/signin");  // Navigate to signin if an error happens
      });
  }, [navigate]);

  // Show loading screen until everything is ready
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render Dashboard components once the token check is done
  return (
    <div className="flex flex-col justify-start h-screen bg-black">
    <div className="mt-8 mr-20 ml-20 mb-8 border border-spacing-8 rounded-xl ring-4 ring-slate-200 bg-white">
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={bal} />
        <Users />
      </div>
    </div>
    </div>
    </div>
  );
};
