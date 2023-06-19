import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { Sandpack } from "@codesandbox/sandpack-react";
import {postData, fetchData} from '../api/apiService'
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
        { id: 'react', name: 'React' },
      ];

  return (
    <>
{userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify}/>)}      
<div className="container mx-auto mt-8">
<div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Bac à sable
            </h2>
          </div>
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