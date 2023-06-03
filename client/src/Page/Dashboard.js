import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../component/Navbar';
import { useNavigate } from 'react-router-dom';
import {fetchData} from '../api/apiService';
import Progress from "../component/progress";

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
        const response = await fetchData('/User/current-user');
        setUserData(response);
        fetchDataUserLanguage(response.id);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
  
    const fetchDataUserLanguage = async (userId) => {
      try {
        const userLanguageResponse = await fetchData("/UserLanguage", {userId});
        setUserLanguage(userLanguageResponse);
        setSelectedLanguage(userLanguageResponse[0].id)
        fetchCourseDefault(userLanguageResponse[0].languageId)
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCourseDefault = async (languageId) => {
      try {
        const courseResponse = await fetchData("/Course/getByLanguage",{languageId});
        setCourse(courseResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataUser();
  }, []);
  const fetchDataCourse = async (languageId) => {
    try {
      const courseResponse = await fetchData("/Course/getByLanguage",{languageId});
      setCourse(courseResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLanguageChange = (languageId) => {
    setSelectedLanguage(languageId);
    fetchDataCourse(languageId)
  };
  const handleManageClick = () => {
    navigate('/ManageInterface')
  }
  const handleCourseClick = () => {
    navigate('/courseForm');
  }
  return (
    <>
    {userData!=null &&(<Navbar displayName={userData.displayName} />)}
      <button onClick={handleManageClick}>Ajouter de la matière</button>
      <button onClick={handleCourseClick}>Ajouter un cours</button>
      <div className="container mx-auto mt-8">
        <div className="flex justify-center mb-4">
          {selectedLanguage !== null && (
          <select
            className="block appearance-none bg-white border border-indigo-600 rounded-md px-4 py-2 text-indigo-600 focus:outline-none focus:border-indigo-400"
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >{userLanguage!=null &&(
            <>
            {userLanguage.map((language) => (
              <option key={language.language.id} value={language.language.id}>{language.language.name}</option>
            ))}</>)}
          </select>
          )}
        </div>
        {course!=null &&(<Progress courseId={course.id} />)}
      </div>
    </>
  );
};

export default Dashboard;