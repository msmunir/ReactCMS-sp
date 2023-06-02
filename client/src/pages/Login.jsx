import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";

const login = ({ user, setUser }) => {
  return <LoginForm user={user} setUser={setUser} />;
};

export default login;
