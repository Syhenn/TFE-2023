import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../api/apiService';
import Progress from "../component/progress";
import { BsChevronCompactDown } from 'react-icons/bs';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [userLanguage, setUserLanguage] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
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
        console.log(response);
        setUserData(response);
        fetchDataUserLanguage(response.id);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    const fetchDataUserLanguage = async (userId) => {
      try {
        const userLanguageResponse = await fetchData("/UserLanguage", { userId });
        setUserLanguage(userLanguageResponse);
        const coursePromises = userLanguageResponse.map((element) =>
          fetchDataCourse(element.languageId)
        );
        const courseResponses = await Promise.all(coursePromises);
        const mergedCourses = courseResponses.reduce(
          (accumulator, currentCourses) => accumulator.concat(currentCourses),
          []
        );
        setCourses(mergedCourses);
        setSelectedCourse(mergedCourses[0]);
        console.log(mergedCourses);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataCourse = async (languageId) => {
      try {
        const courseResponse = await fetchData("/Course/getByLanguage", { languageId });
        return courseResponse;
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataUser();
  }, []);

  const handleCourseChange = (courseId) => {
    const selectedCourse = courses.find((course) => course.id === parseInt(courseId));
    setSelectedCourse(selectedCourse);
    console.log(courseId);
  };

  return (
    <>
      {userData !== null && (
        <Navbar
          displayName={userData.displayName}
          role={userData.userRole}
          isVerify={userData.isVerify}
        />
      )}
      <div className="w-full pt-8 bg-gradient-to-b from-blue-200 to-blue-400">
        <div className="flex justify-center mb-4 relative">
          {courses.length > 0 && (
            <div className="relative">
              <select
                className="block appearance-none bg-white border border-indigo-600 rounded-md px-4 py-2 text-indigo-600 focus:outline-none focus:border-indigo-400 shadow-md pr-8" // Ajout de 'pr-8'
                value={selectedCourse?.id.toString() || ''}
                onChange={(e) => handleCourseChange(e.target.value)}
              >
                <option disabled value="">
                  Sélectionnez un cours
                </option>
                {courses
                  .filter((course) => course.isVerify)
                  .map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <BsChevronCompactDown className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          )}
        </div>
        {selectedCourse !== null && (
          <Progress courseId={selectedCourse.id} userId={userData.id} />
        )}
      </div>
    </>
  );
  
  
};

export default Dashboard;