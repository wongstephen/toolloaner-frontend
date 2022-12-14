import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckToken } from "../hooks/useCheckToken";
import axios from "axios";

import { LoginRegisterLink } from "./presentational/LoginRegisterLink";
import useDisabled from "../hooks/useDisabled";
import { PageTemplate } from "./presentational/PageTemplate";
import { InputText } from "./presentational/InputText";

export const Login = () => {
  const navigate = useNavigate();
  useCheckToken(); //Send user to feed if already logged in

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useDisabled(true);
  const [showErr, setShowErr] = useState(false);

  //Stores values of input into userInput state
  const handleChange = (e) => {
    setUserInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  //Disables login button if email/pw critera isn't met
  useEffect(() => {
    if (userInput.email.length > 0 && userInput.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });

  //TODO: move this to a custom hook
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/signin`,
        userInput
      );
      if (res.status === 200) {
        console.log("Success!");
        localStorage.setItem("token", res.data.token);
        navigate("/feed");
      }
    } catch (err) {
      console.log("Invalid email or password.");
      setShowErr(true);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <PageTemplate>
      <h2 className="mt-5 text-sm font-light text-center" data-testid="title">
        Login or Register below to get started
      </h2>

      <form
        className="flex flex-wrap justify-center max-w-sm gap-2.5 my-2 mx-auto"
        onSubmit={handleLogin}
      >
        <InputText
          placeholder="Email"
          type="text"
          name="email"
          onChange={handleChange}
          size="30"
          required
        />
        <InputText
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          required
        />
        <p
          className="mx-auto mt-5 text-sm text-center text-red-700"
          style={{ display: `${showErr ? "block" : "none"}` }}
        >
          Please enter a valid email and password.
        </p>
        <button
          aria-label="login"
          disabled={disabled}
          name="loginBtn"
          type="submit"
          className={`px-6 py-3 font-bold text-white rounded-sm w-full ${
            disabled
              ? "bg-gray-300 disabled:"
              : "bg-blue-500  hover:bg-blue-700 hover:shadow-lg"
          }`}
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      <LoginRegisterLink />
    </PageTemplate>
  );
};
