import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './component/Navbar';
import { useNavigate } from 'react-router-dom';
import ManageInterface from "./component/manageInterface";
import Progress from "./component/progress";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [userLanguage, setUserLanguage] = useState(null);
  const [course, setCourse] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
  
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
    const fetchDataUser = async () => {
      try {
        const response = await axios.get("https://localhost:7227/User/current-user");
        setUserData(response.data);
        fetchDataUserLanguage(response.data.id);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
  
    const fetchDataUserLanguage = async (userId) => {
      try {
        const userLanguageResponse = await axios.get("https://localhost:7227/UserLanguage", {
          params: {
            userId: userId
          }
        });
        setUserLanguage(userLanguageResponse.data);
        setSelectedLanguage(userLanguageResponse.data[0].id)

      } catch (error) {
        console.log(error);
      }
    };

    fetchDataUser();
  }, []);
  const fetchDataCourse = async (languageId) => {
    try {
      const courseResponse = await axios.get("https://localhost:7227/Course", {
        params: {
          languageId: languageId
        }
      });
      setCourse(courseResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLanguageChange = (languageId) => {
    setSelectedLanguage(languageId);
    fetchDataCourse(languageId)
  };
  if (userData === null || userLanguage === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar displayName={userData.displayName} />
      <div className="container mx-auto mt-8">
        <Progress chapterId={1} />
        <div className="flex justify-center mb-4">
          <select
            className="block appearance-none bg-white border border-indigo-600 rounded-md px-4 py-2 text-indigo-600 focus:outline-none focus:border-indigo-400"
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {userLanguage.map((language) => (
              <option key={language.language.id} value={language.language.id}>{language.language.name}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Dashboard;