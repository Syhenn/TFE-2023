import React, { useEffect, useState } from 'react';
import { postData, fetchData } from '../api/apiService';
import { ToastContainer, toast } from 'react-toastify';
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
        
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const fetchDataUser = async () => {
        try {
          const response = await fetchData("/User/current-user");
          if(response.isVerify === false){
            navigate('/dashboard');
          }
          setUserData(response);
          fetchCourses(response.id, response.userRole);
        } catch (error) {
          console.error(error);
          navigate("/");
        }
      };
    const fetchCourses = async (userId, userRole) => {
        try {
          const coursesResponse = await fetchData("/Course");
          console.log(userData);
          if (coursesResponse !== null) {       
            if(userRole == 1){
              const userCourses = coursesResponse.filter((course) => course.createdBy === userId);
              setCourses(userCourses);
              setSelectedCourse(userCourses[0]);
            }else if(userRole == 2){
              setCourses(coursesResponse);
              setSelectedCourse(coursesResponse[0]);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchDataUser();
}, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    quizData.courseId = selectedCourse;
    try {
      await postData('/Quiz', quizData);
      toast.success("Quiz ajouté", { autoClose: 5000 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };
  const handleCourseChange = (event) => {
    const id = parseInt(event.target.value);
    setSelectedCourse(id);
  };
  return (
    <>
    {userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify}/>)}
    <div className="container">
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-gray-900">
        Création de question pour le Quiz
      </h2>
    </div>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mx-auto">
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
        <div className="mb-4 mx-auto">
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
        <div className="mb-4 mx-auto">
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
        <div className="mb-4 mx-auto">
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
        <div className="mb-4 mx-auto">
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
        <div className="mb-4 mx-auto">
          <label htmlFor="courseId" className="block text-gray-700 font-bold mb-2">
            Pour quel cours créer le Quiz
          </label>
          {selectedCourse !== null &&(
            <>
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
            </>
          )}

        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Créer le quiz
        </button>
      </form>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default CreateQuizForm;
