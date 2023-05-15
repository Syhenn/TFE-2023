import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7227/token", {
        email,
        password
      }).then(function (response) {
        localStorage.setItem("token", response.data);
        navigate("/dashboard");
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Connexion</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="label-t-input-form">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-log-form"
            />
          </div>
          <div>
            <label htmlFor="password" className="label-t-input-form">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-log-form"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Se connecter
            </button>
            </div>
        </form>
        <div className="text-sm text-center">
          <p className="text-gray-600">Tu n'as pas de compte ?</p>
          <a
            href="/Register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            S'enregistrer
          </a>
        </div>
        <h1 className="text-center">TFE - HENQUIN Sylvain - 2023</h1>
      </div>
    </div>
  )
};
export default Login;