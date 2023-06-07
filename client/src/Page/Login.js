import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {postData} from '../api/apiService'
import '../styleComponent/LoginRegisterStyle.css';
import bcrypt from 'bcryptjs';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userCredentials = {
      email, password
    };
    try {
      var response = await postData('/token', userCredentials)
      localStorage.setItem("token", response);
      navigate("/dashboard");

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
      <div className="custom-shape-divider-bottom-1685094975">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
    </div>
    </div>
    
  )
};
export default Login;