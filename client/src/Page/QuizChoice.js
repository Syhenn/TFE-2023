import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import { fetchData } from "../api/apiService";
import { useNavigate } from "react-router-dom";

const QuizChoice = () => {
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState(null);
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
        const response = await fetchData("/User/current-user");
        setUserData(response);
        fetchCourses();
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    const fetchCourses = async () => {
      try {
        const coursesResponse = await fetchData("/Course");
        setCourses(coursesResponse);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataUser();
  }, [navigate]);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleStartQuiz = () => {
    if (selectedCourse) {
       navigate(`/quizPage/${selectedCourse}`);
    }
  };

  return (
    <>
    {userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} />)}
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Interface de gestion</h2>
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Pour quel cours faire un quiz :</h2>
        <select
          value={selectedCourse}
          onChange={handleCourseChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
            <option value="">Séléctionnez un cours</option>
          {courses &&
            courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
        </select>
        <button
          onClick={handleStartQuiz}
          disabled={!selectedCourse}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Démarrer le quiz
        </button>
      </div>
    </div>
    </>
  );
};

export default QuizChoice;
