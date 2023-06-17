import React, { useEffect, useState } from 'react';
import { fetchData, putData } from '../api/apiService';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import axios from 'axios';

const UpdateQuiz = () => {
  const [quiz, setQuiz] = useState({
    Name: '',
    Title: '',
    FalseAnswerOne: '',
    FalseAnswerTwo: '',
    CorrectAnswer: '',
    CourseId: 0,
  });
  const [userData, setUserData] = useState('');
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const fetchDataUser = async () => {
        try {
          const response = await fetchData("/User/current-user");
          if(response.isVerify === false){
            navigate('/dashboard');
          }
          setUserData(response);
        } catch (error) {
          console.error(error);
          navigate("/");
        }
    };   
    const fetchQuiz = async () => {
      try {
        const response = await fetchData(`/Quiz/${quizId}`);
        setQuiz(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataUser();
    fetchQuiz();
  }, [quizId]);

  const handleInputChange = (e) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await putData(`/Quiz/${quizId}`, quiz);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
{userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify}/>)}      <div className="container mx-auto py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Modifier le Quiz
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6 mr-10 ml-10">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nom du Quiz
            </label>
            <input
              type="text"
              id="name"
              name="Name"
              value={quiz.Name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              required
            />
          </div>

          <div className="mb-6 mr-10 ml-10">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Titre du Quiz
            </label>
            <input
              type="text"
              id="title"
              name="Title"
              value={quiz.Title}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              required
            />
          </div>

          <div className="mb-6 mr-10 ml-10">
            <label className="block text-gray-700 mb-2" htmlFor="falseAnswerOne">
              Fausse réponse 1
            </label>
            <input
              type="text"
              id="falseAnswerOne"
              name="FalseAnswerOne"
              value={quiz.FalseAnswerOne}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              required
            />
          </div>

          <div className="mb-6 mr-10 ml-10">
            <label className="block text-gray-700 mb-2" htmlFor="falseAnswerTwo">
              Fausse réponse 2
            </label>
            <input
              type="text"
              id="falseAnswerTwo"
              name="FalseAnswerTwo"
              value={quiz.FalseAnswerTwo}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              required
            />
          </div>

          <div className="mb-6 mr-10 ml-10">
            <label className="block text-gray-700 mb-2" htmlFor="correctAnswer">
              Réponse correcte
            </label>
            <input
              type="text"
              id="correctAnswer"
              name="CorrectAnswer"
              value={quiz.CorrectAnswer}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              required
            />
          </div>

          <div className="mb-6 mr-10 ml-10">
            <label className="block text-gray-700 mb-2" htmlFor="courseId">
              ID du cours
            </label>
            <input
              type="number"
              id="courseId"
              name="CourseId"
              value={quiz.CourseId}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateQuiz;
