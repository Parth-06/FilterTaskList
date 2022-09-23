import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const callmainpagee = async () => {
      try {
        const res = await fetch("/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        dispatch({ type: "USER", payload: false });
        navigate("/login");
        toast.error("Logout");
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        console.warn(err.responseText);
      }
    };
    callmainpagee();
  });
  return (
    <div>
      {" "}
      <ToastContainer />
    </div>
  );
};

export default Logout;
