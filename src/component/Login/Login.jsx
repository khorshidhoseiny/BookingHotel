import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("1234");
  const { user, isAthenticated, login } = useAuth();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  console.log(isAthenticated);

  useEffect(() => {
    if (isAthenticated) navigate("/", { replace: true });
  }, [isAthenticated, navigate]);
  console.log(user);

  return (
    <div className="loginContainer">
      <h2> ورود به حساب کاربری🧑🏻‍💻</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">ایمیل</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">رمز عبور</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">ورود</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
