import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, postData } from '../api/apiService';
import { BsClockFill } from 'react-icons/bs';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

const QuizPage = () => {
  const { courseId } = useParams();
  const [userData, setUserData] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [quizCompletedMessage, setQuizCompletedMessage] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizDataForm, setQuizDataForm] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
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
        const response = await fetchData('/User/current-user');
        setUserData(response);
        fetchQuizData(response);
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    const fetchQuizData = async (data) => {
      try {
        const quizzesResponse = await fetchData(`/Course/getIncluded`, { courseId: courseId });
        const quizzes = quizzesResponse.quizzes;
        const unansweredQuizzes = [];

        for (const quiz of quizzes) {
          const response = await axios.get(`/CorrectAnswer/GetByQuizAndUser?quizId=${quiz.id}&userId=${data.id}`);
          const correctAnswer = response.data;
          console.log(correctAnswer);
          if (!correctAnswer) {
            unansweredQuizzes.push(quiz);
          }
        }

        setQuizData(unansweredQuizzes);
        startTimer(120);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataUser();
  }, [courseId, navigate]);

  const startTimer = (timeLimitInSeconds) => {
    setTimeLeft(timeLimitInSeconds);

    const intervalId = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      handleNextQuestion();
    }, timeLimitInSeconds * 1000);
  };

  const handleNextQuestion = (survey) => {
    const quiz = quizData[currentQuestionIndex];
    if (quiz && quiz.id) {
      const userAnswer = survey && survey.valuesHash ? survey.valuesHash[quiz.name] : '';
      const correctAnswer = quiz.correctAnswer || '';
      const points = userAnswer === correctAnswer ? 15 : 0;
  
      const updatedTotalScore = totalScore + points;
      setTotalScore(updatedTotalScore);
  
      if (userAnswer === correctAnswer) {
        const correctAnswerDto = {
          UserId: userData.id,
          QuizId: quiz.id,
        };
  
        try {
          postData('/CorrectAnswer', correctAnswerDto);
        } catch (error) {
          console.log(error);
        }
      }
  
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };
  

  const handleOnComplete = (survey) => {
    const quiz = quizData[currentQuestionIndex];
    const userAnswer = survey.valuesHash[quiz.name];
    const correctAnswer = quiz.correctAnswer;
    const points = userAnswer === correctAnswer ? 15 : 0;

    if (userAnswer === correctAnswer) {
      const correctAnswerDto = {
        UserId: userData.id,
        QuizId: quiz.id,
      };

      try {
        postData('/CorrectAnswer', correctAnswerDto);
      } catch (error) {
        console.log(error);
      }
    }

    const updatedTotalScore = totalScore + points;
    setTotalScore(updatedTotalScore);

    if (currentQuestionIndex === quizData.length - 1) {
      const scoreMessage = `Quiz terminé! Votre score est de ${totalScore + points} points`;
      setQuizCompletedMessage(scoreMessage);
    } else {
      handleNextQuestion(survey);
    }
  };

  const generateQuizDataForm = (quizData) => {
    const choices = [
      quizData.fakeAnswerOne,
      quizData.fakeAnswerTwo,
      quizData.correctAnswer
    ];
    choices.sort(() => 0.5 - Math.random());

    const quizDataJson = {
      id: quizData.id,
      name: quizData.name,
      title: quizData.title,
      questions: [
        {
          name: quizData.name,
          type: 'radiogroup',
          title: quizData.title,
          choices
        },
      ],
    };

    setQuizDataForm(quizDataJson);
  };

  useEffect(() => {
    if (quizData.length > 0 && currentQuestionIndex < quizData.length) {
      generateQuizDataForm(quizData[currentQuestionIndex]);
    } else {
      setQuizDataForm(null); // Réinitialiser le formulaire si le quiz est vide
      setQuizCompletedMessage("Vous avez déjà répondu à toutes les questions du quiz."); // Définir le message d'erreur
    }
  }, [quizData, currentQuestionIndex]);

  const handleToDashboard = () => {
    navigate('/dashboard');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      {userData != null && (
        <Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify} />
      )}
      <div className="container mx-auto mt-8">
        {quizDataForm != null ? (
          <>
            {quizCompletedMessage ? (
              <div className="text-center flex justify-center flex-col items-center">
                <h2 className="text-3xl font-bold mb-5">{quizCompletedMessage}</h2>
                <button
                  className="group relative w-1/2 flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                  onClick={handleToDashboard}
                >
                  Revenir à l'accueil
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <BsClockFill className="mr-2 text-gray-500" size={20} />
                  <span className="text-xl">{formatTime(timeLeft)}</span>
                </div>
                <Survey.Survey json={quizDataForm} onComplete={handleOnComplete} />
              </>
            )}
          </>
        ) : (
          <div className="text-center flex justify-center items-center flex-col">
            <h2 className="text-3xl font-bold mb-5">Aucune question de quiz disponible.</h2>
            <button
              className="group relative w-1/2 flex justify-center py-2 px-4 border 
              border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
              onClick={handleToDashboard}
            >
              Revenir à l'accueil
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
