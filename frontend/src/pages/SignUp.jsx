import {Heading} from '../components/Heading.jsx'
import { SubHeading } from '../components/SubHeading.jsx'
import {InputBox} from '../components/InputBox.jsx'
import {Button} from '../components/Button.jsx'
import { BottomWarning } from '../components/BottomWarning.jsx'
import axios from 'axios'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check localstorage
    if (userToken) {
      navigate("/dashboard"); // Redirect to sign-in page if token is not in localstorage
    }
  }, []);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 ring-8 ring-slate-200 text-center p-2 h-max px-4">
          <Heading label={"QuickCoin"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="Firstname"
            label={"First name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Lastname"
            label={"Last name"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Email"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                    import.meta.env.VITE_SERVER_URL + "/v1/user/signup",
                  {
                    username,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};