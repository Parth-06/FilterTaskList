import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";

const Register = () => {
  const { state, dispatch } = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });
    dispatch({ type: "USER", payload: true });
    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.error("Unseccessfull");
    } else {
      navigate("/logins");
      toast.success("Registered Successfully");
    }
  };

  return (
    <div className="regi">
      <div className="regi_name">
        <h1>Register</h1>
      </div>
      <form className="regi_form" method="POST">
        <div className="regi_in">
          <input
            type="text"
            placeholder="Name"
            className="regi_input"
            name="name"
            value={user.name}
            onChange={handleInput}
            autoComplete="off"
          />
        </div>
        <div className="regi_in">
          <input
            type="email"
            placeholder="Email"
            className="regi_input"
            name="email"
            value={user.email}
            onChange={handleInput}
            autoComplete="off"
          />
        </div>
        <div className="regi_in">
          <input
            type="text"
            placeholder="Password"
            className="regi_input"
            name="password"
            value={user.password}
            onChange={handleInput}
            autoComplete="off"
          />
        </div>
        <div className="regi_in">
          <input
            type="text"
            placeholder="Confirm Password"
            className="regi_input"
            name="cpassword"
            value={user.cpassword}
            onChange={handleInput}
            autoComplete="off"
          />
        </div>
        <div className="regi_button">
          <button className="regi_button_main" onClick={postData}>
            {" "}
            Register
          </button>
          <button
            className="regi_button_main"
            style={{ border: "4px solid rgb(30, 13, 109)" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Already Registered? Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
