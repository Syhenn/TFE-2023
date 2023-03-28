import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import logo from '../../img/programmer-login.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7101/User/login", {
        email,
        password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center flex-col justify-center">
      <div className="flex items-center p-0 mx-auto h-4/6 w-4/6 shadow-2xl bg-[#F2F2F2] mb-10">
        <div className="flex w-1/2 h-full bg-[#256289] justify-around text-white items-center text-center flex-col"> 
        <div>          
          <h1 className="text-4xl font-bold">CodinTime</h1>
          </div>
          <div className="m-10">          
            <h2 className=" text-xl"><p>Transformez vos rêves de programmation en réalité.</p> <p>Ensemble, apprenons et créons des projets incroyables.</p></h2>
          </div>
          <div className="flex items-center justify-center">
            <img src={logo} className="w-4/6 m-0 p-0"alt="Logo" />
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center">
          <div className="flex h-full flex-col w-5/6 items-center justify-between">
            <h2 className="font-bold pt-20 text-4xl">Connexion</h2>
            <form onSubmit={handleSubmit} className="pb-20">
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-bold">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 font-bold">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="w-max text-center">
                <p>Tu n'as pas de compte ?</p><p><a href="/Register">S'enregistrer</a></p>
              </div>
              <button
                type="submit"
                className="w-full mt-20 p-2 text-white bg-blue-700 rounded hover:bg-blue-800"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
      <h1 className="text-2xl">TFE 2023 - HENQUIN Sylvain - Développement</h1>
    </div>
  );
};

export default Login;