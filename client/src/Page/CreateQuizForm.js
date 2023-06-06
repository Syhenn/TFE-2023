import React, { useEffect, useState } from 'react';
import { postData, fetchData } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../component/Navbar';

const CreateQuizForm = () => {
  const [courses, setCourses] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userData, setUserData] = useState(null);
  const [quizData, setQuizData] = useState({
    name: '',
    title: '',
    falseAnswerOne: '',
    falseAnswerTwo: '',
    correctAnswer: '',
    courseId: 0
  });
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
        
    const fetchDataUser = async () => {
        try {
          const response = await axios.get("https://localhost:7227/User/current-user");
          setUserData(response.data);
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
      fetchCourses();
      fetchDataUser();
});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData('/Quiz', quizData);
      navigate('/success');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };
  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };
  return (
    <>
    {userData && <Navbar displayName={userData.displayName} role={userData.userRole} />}
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Créer un quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Nom de la question
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={quizData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Énoncé
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={quizData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="falseAnswerOne" className="block text-gray-700 font-bold mb-2">
            Première mauvaise réponse
          </label>
          <input
            type="text"
            id="falseAnswerOne"
            name="falseAnswerOne"
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={quizData.falseAnswerOne}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="falseAnswerTwo" className="block text-gray-700 font-bold mb-2">
            Deuxième mauvaise réponse
          </label>
          <input
            type="text"
            id="falseAnswerTwo"
            name="falseAnswerTwo"
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={quizData.falseAnswerTwo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="correctAnswer" className="block text-gray-700 font-bold mb-2">
            Bonne réponse
          </label>
          <input
            type="text"
            id="correctAnswer"
            name="correctAnswer"
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={quizData.correctAnswer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="courseId" className="block text-gray-700 font-bold mb-2">
            Course ID
          </label>
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
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Créer le quiz
        </button>
      </form>
    </div>
    </>
  );
};

export default CreateQuizForm;