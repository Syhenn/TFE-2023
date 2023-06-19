import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../api/apiService';
import Progress from "../component/progress";

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
      {userData != null && (
        <Navbar
          displayName={userData.displayName}
          role={userData.userRole}
          isVerify={userData.isVerify}
        />
      )}
      <div className="container mx-auto mt-8">
        <div className="flex justify-center mb-4">
          {courses.length > 0 && (
            <select
              className="block appearance-none bg-white border border-indigo-600 rounded-md px-4 py-2 text-indigo-600 focus:outline-none focus:border-indigo-400"
              value={selectedCourse?.id.toString() || ''}
              onChange={(e) => handleCourseChange(e.target.value)}
            >
              {courses
                .filter((course) => course.isVerify)
                .map((course) => (
                  <option key={course.id} value={course.id} className="text-center">
                    {course.title}
                  </option>
                ))}
            </select>
          )}
        </div>
        {selectedCourse != null && (
          <Progress courseId={selectedCourse.id} userId={userData.id} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
