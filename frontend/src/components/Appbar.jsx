import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (!userToken) {
      navigate("/signin"); // Redirect to sign-in page if token doesn't exist
    } else {
      axios
        .get("http://172.28.224.30:4756/v1/user/getUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, []);

  const signOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="mt-2 shadow h-16 flex justify-between items-center md:px-10">
      <Link to={"/dashboard"}>
        <div className="flex flex-col justify-center h-full ml-4 font-bold text-3xl font-mono">
          QuickCoin
        </div>
      </Link>
      <div className="flex items-center justify-center gap-2">
        <Button label={"Sign Out"} onClick={signOutHandler} />
        <div className="flex flex-col justify-center h-full mr-4">
          {user?.firstName}
        </div>
        <div className="rounded-full h-10 w-10 p-4 bg-slate-200 flex justify-center mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user?.firstName[0].toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};