import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../styleComponent/LoginRegisterStyle.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Mot de passe oublié ?</h2>
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
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Réinitialiser le mot de passe
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p className="text-gray-600">Souvenez-vous de votre mot de passe ?</p>
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Connexion
          </Link>
        </div>
        <h1 className="text-center">TFE - HENQUIN Sylvain - 2023</h1>
      </div>
    </div>
  );
};

export default ForgotPassword;
