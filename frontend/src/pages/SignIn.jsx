// http://localhost:4756/v1/user/signin

import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning.jsx";
import { Button } from "../components/Button.jsx";
import { Heading } from "../components/Heading.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Only check the token and navigate if needed after initial render
  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // If a token is found, immediately navigate to the dashboard
    if (userToken) {
      navigate("/Dashboard");
    }
  }, [navigate]);

  const handleSignin = async () => {
    setLoading(true); // Start loading when user clicks "Sign in"
    try {
      const response = await axios.post("http://172.28.224.30:4756/v1/user/signin", {
        username,
        password,
      });

      // Store token and navigate to dashboard
      localStorage.setItem("token", response.data.token);
      setLoading(false); // Stop loading after successful sign-in
      navigate("/Dashboard");
    } catch (error) {
      setError("Invalid username or password. Please try again.");
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-[310px] ring-8 ring-slate-200 text-center p-2 h-max px-4">
          <Heading label={"QuickCoin"} />
          <SubHeading label={"Enter your credentials to Sign In"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
            label={"Email"}
          />
          
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            label={"Password"}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="pt-4">
            <Button onClick={handleSignin} label={loading ? "Signing In..." : "Sign in"} />
          </div>

          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};
