import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FiUserPlus } from 'react-icons/fi';
import './Register.css'; 

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [age, setAge] = useState("");
  const [userRole, setUserRole] = useState('');
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const navigate = useNavigate();
  const userRolesMap = {
    Student: 0,
    Teacher: 1,
    Administrator: 2
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !surname || !displayName || !email || !password || !age) {
      let errorMessage = 'Veuillez remplir les champs suivants :';
      if (!name) {
        errorMessage += ' Nom,';
      }
  
      if (!surname) {
        errorMessage += ' Prénom,';
      }
  
      if (!displayName) {
        errorMessage += ' Pseudo,';
      }
  
      if (!email) {
        errorMessage += ' Email,';
      }
  
      if (!password ||!repassword) {
        errorMessage += ' Mot de passe,';
      }
  
      if (!age) {
        errorMessage += ' Age,';
      }
      errorMessage = errorMessage.slice(0, -1);
  
      toast.error(errorMessage, { autoClose: 5000 });
      return;
    }
    if (password !== repassword) {
      let errorMessage = "Les mots de passes ne correspondent pas."
      toast.error(errorMessage, { autoClose: 5000 });
      return;
    }
    
    if(step === 1){
      VerifyUserData();
    }
    if (userRole && step === 2){
      nextStep();
      toast.error("Aucun rôle n'a été séléctionné.", { autoClose: 5000 })
    }if(step === 3){
      Register();
    }
  };
  const VerifyUserData= async (e) => {
    const userDto = {
      name,
      surname,
      displayName,
      email,
      password,
      age
    };
    try {
      const response = await axios.post("https://localhost:7227/User/verify-user-data", userDto);
      const result = response.data;
      if (result) {
        nextStep();
      }else {
        toast.error(result, {autoClose: 5000})
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }
  const Register = async (e) => {
    const userDto = {
      name,
      surname,
      displayName,
      email,
      password,
      age,
      userRole: userRolesMap[userRole]
    };
    try {
      var user = await axios.post("https://localhost:7227/User", userDto);
      var userId = user.data.id;
      var language= await axios.get("https://localhost:7227/Language/UserLanguage", {
        params:{
          name : selectedLanguage
        }
      });
      var languageId = language.data.id;
      var userLanguageDto = {
        userId,
        languageId
      };
      await axios.post("https://localhost:7227/UserLanguage", userLanguageDto);
     navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
  <TransitionGroup className="transition-group">
    <CSSTransition key={step} classNames="fade" timeout={300}>
    <div className="route-section">
    {step === 1 && (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Enregistrement</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="label-t-input-form">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-log-form"
          />
        </div>
          <div>
            <label htmlFor="surname" className="label-t-input-form">
              Prénom
            </label>
            <input
              id="surname"
              name="surname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="input-log-form"
            />
          </div>
          <div>
            <label htmlFor="displayName" className="label-t-input-form">
              Pseudo
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input-log-form"
            />
          </div>
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
            <label htmlFor="password" className="label-t-input-form">
              Retapez le mot de passe
            </label>
            <input
              id="repassword"
              name="repassword"
              type="password"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              className="input-log-form"
            />
          </div>
          <div>
            <label htmlFor="age" className="label-t-input-form">
              Tu as quel âge ?
            </label>
            <input
              id="age"
              name="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-[5px] "
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Se souvenir de moi
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continuer
            </button>
            </div>
        </form>
        <div className="text-sm text-center">
          <p className="text-gray-600">Tu as déjà un compte ?</p>
          <a
            href="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Se connecter
          </a>
        </div>
      </div>
    </div>
    )}
    {step === 2 && (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Dis nous en plus...</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="0" className="block text-sm font-medium text-gray-700">
                Type d'utilisateur
              </label>
              <select
                id="userRole"
                name="userRole"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-[5px]"
              >
                <option value="">Sélectionnez un type</option>
                <option value="Student">Étudiant</option>
                <option value="Teacher">Professeur</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continuer
              </button>
              </div>
          </form>
        </div>
      </div>
      )}
      {step === 3 && (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Quel langage souhaites-tu apprendre pour commencer ?</h2>
    </div>
    <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
      <div className="flex justify-around items-center">
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
          <input
            type="radio"
            id="c++"
            name="language"
            value="c++"
            className="sr-only"
            checked={selectedLanguage === 'c++'}
            onChange={() => setSelectedLanguage('c++')}
          />
          <label htmlFor="c++" className={`flex items-center p-4 cursor-pointer`}>
            <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-indigo-500 mr-4 ${selectedLanguage === 'c++' ? 'bg-indigo-500' : ''}`}></span>
            <span className="text-lg font-medium text-gray-900">C++</span>
          </label>
          <p className="text-gray-500">Utilisé dans les domaines tels que les systèmes embarqués, les jeux vidéo, la robotique, etc.</p>
        </div>
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md m-2">
          <input
            type="radio"
            id="java"
            name="language"
            value="java"
            className="sr-only"
            checked={selectedLanguage === 'java'}
            onChange={() => setSelectedLanguage('java')}
          />
          <label htmlFor="java" className={`flex items-center p-4 cursor-pointer`}>
            <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-indigo-500 mr-4 ${selectedLanguage === 'java' ? 'bg-indigo-500' : ''}`}></span>
            <span className="text-lg font-medium text-gray-900">Java</span>
          </label>
          <p className="text-gray-500">Utilisé dans les domaines tels que le développement d'applications Android, les services bancaires, etc.</p>
        </div>
      </div>
      <button
        className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >Choisir plus tard</button>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
         <FiUserPlus className="mr-2" />
        S'enregistrer
      </button>
    </form>
  </div>
</div>
      )}
      </div>
      </CSSTransition>
    </TransitionGroup>
    <ToastContainer />

    </>
  );
};

export default Register;