import "./App.css";
import React, { createContext, useReducer } from "react";
import Todo from "./Components/TaskList";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import ErrorPage from "./Components/ErrorPage";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { initialstate, reducer } from "./reducer/UseReducer";
import { HashRouter } from "react-router-dom";
import TaskList from "./Components/TaskList";
export const UserContext = createContext();
const Routing = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logouts" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routing />
      </UserContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={20}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={0}
        theme="colored"
      />
    </>
  );
}

export default App;
