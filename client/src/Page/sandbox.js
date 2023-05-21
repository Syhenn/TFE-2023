import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/navbar';
import axios from 'axios';
import { Sandpack } from "@codesandbox/sandpack-react";
const Sandbox = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('react');
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
    
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
        const fetchData = async () => {
          try {
            const response = await axios.get("https://localhost:7227/User/current-user");
            setUserData(response.data);
          } catch (error) {
            console.error(error);
            navigate("/login");
          }
        };
        fetchData();
      }, []);
    
      if (userData === null) {
        return <div>Loading...</div>;
      }
      const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
      };
    
      const languageList = [
        { id: 'vanilla', name: 'Vanilla' },
        { id: 'react', name: 'React' },
        { id: 'vue', name: 'Vue' },
      ];

  return (
    <>
      <Navbar displayName={userData.displayName} />
      <div className="container mx-auto mt-8">
        <div className="flex justify-center space-x-4 mb-4">
          <ul className="flex space-x-4">
            {languageList.map((language) => (
              <li
                key={language.id}
                className={`cursor-pointer ${
                  selectedLanguage === language.id
                    ? 'font-bold text-indigo-900'
                    : 'text-indigo-600'
                }`}
                onClick={() => handleLanguageChange(language.id)}
              >
                {language.name}
              </li>
            ))}
          </ul>
        </div>
        <Sandpack template={selectedLanguage} />
      </div>
    </>
  );
};

export default Sandbox;