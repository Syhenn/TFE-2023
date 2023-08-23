import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { Sandpack } from "@codesandbox/sandpack-react";
import { postData, fetchData } from '../api/apiService';

const Sandbox = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('react');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchDataUser = async () => {
      try {
        const response = await fetchData('/User/current-user');
        setUserData(response);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    fetchDataUser();
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const languageList = [
    { id: 'vanilla', name: 'JavaScript' },
    // Add more languages if needed
  ];

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-400 min-h-screen">
      {userData != null && (
        <Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify}/>
      )}
      <div className="container mx-auto mt-8 p-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-black">🚀 Let's Play in the Sandbox! </h2>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <ul className="flex space-x-4">
            {languageList.map((language) => (
              <li
                key={language.id}
                className={`cursor-pointer ${
                  selectedLanguage === language.id
                    ? 'font-bold text-black'
                    : 'text-black hover:text-gray'
                }`}
                onClick={() => handleLanguageChange(language.id)}
              >
                {language.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="shadow-lg rounded-lg p-6 bg-white text-gray-900">
          <Sandpack template={selectedLanguage} />
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
