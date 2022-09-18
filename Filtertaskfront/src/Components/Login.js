import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { UserContext } from "../App";
const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();

    const res = await fetch("/logins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.status === 400 || !data) {
      toast.error("Invaid Login Details");
    } else {
      toast.success("Login successfully");
      dispatch({ type: "USER", payload: true });
      navigate("/");
    }
  };

  const filltest = (e) => {
    e.preventDefault();
    const Eval = (e.target.value = "trial@gmail.com");
    setEmail(Eval);
    const Pass = (e.target.value = "password@123");
    setPassword(Pass);
  };
  return (
    <div className="regi">
      <div className="regi_name">
        <h1>Login</h1>
      </div>
      <form className="regi_form" method="POST">
        <div className="regi_in">
          <input
            type="email"
            placeholder="Email"
            className="regi_input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="regi_in">
          <input
            type="Password"
            placeholder="Password"
            className="regi_input"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="regi_button">
          <button className="regi_button_test" onClick={filltest}>
            {" "}
            Fill Test Credentials
          </button>
          <button className="regi_button_main" onClick={loginuser}>
            {" "}
            Login
          </button>

          <button
            className="regi_button_main"
            style={{ border: "4px solid rgb(30, 13, 109)" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            {" "}
            Not Registered? Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
