import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../api/apiService';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

const QuizPage = () => {
  const { courseId } = useParams();
  const [userData, setUserData] = useState(null);
  const [quizData, setQuizData] = useState([]);
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
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    const fetchQuizData = async () => {
      try {
        const quizzesResponse = await fetchData(`/Course/getIncluded`, { courseId: courseId });
        console.log(quizzesResponse);
        setQuizData(quizzesResponse.quizzes);
        startTimer(120); // Start the timer for the first question (120 seconds)
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchDataUser();
    fetchQuizData();
  }, [courseId, navigate]);

  const startTimer = (timeLimitInSeconds) => {
    setTimeLeft(timeLimitInSeconds);

    const intervalId = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      handleNextQuestion(); // Move to the next question when the time expires
    }, timeLimitInSeconds * 1000);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    // Perform any additional actions when moving to the next question
  };

  const handleOnComplete = (survey) => {
    // Process the user's response for the current question
    if (currentQuestionIndex === quizData.length - 1) {
      // Last question, quiz completed
      console.log('Quiz completed!');
      // Perform actions for quiz completion, e.g., calculate points
    } else {
      // Move to the next question
      handleNextQuestion();
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
    }
  }, [quizData, currentQuestionIndex]);

  return (
    <>
      {userData != null && <Navbar displayName={userData.displayName} />}
      <div className="container mx-auto mt-8">
        {quizDataForm != null && (
          <>
            <h2>Temps restant: {timeLeft} secondes</h2>
            <Survey.Survey
              json={quizDataForm}
              onComplete={handleOnComplete}
            />
          </>
        )}
      </div>
    </>
  );
};

export default QuizPage;
