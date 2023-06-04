import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../api/apiService';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import '../styleComponent/quiz.css';

const QuizPage = () => {
  const [userData, setUserData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [quizDataForm, setQuizDataForm] = useState(null);
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
        const response = await fetchData('/User/current-user');
        setUserData(response);
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    const fetchQuizData = async () => {
      try {
        const quizResponse = await fetchData(`/Quiz`, { quizId });
        setQuizData(quizResponse);
        generateQuizDataForm(quizResponse);
      } catch (error) {
        console.log(error);
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
    fetchDataUser();
    fetchQuizData();
  }, [quizId, navigate]);
  const customizeButton = (survey, options) => {
    options.css = {
      button: 'custom-button',
    };
  };
  const handleOnComplete = (survey) => {
    if(survey.valuesHash[quizData.name] == quizData.correctAnswer){

    }else{
        console.log("Mauvaise réponse !")
    }
  };

  return (
    <>
      {userData != null && <Navbar displayName={userData.displayName} />}
      <div className="container mx-auto mt-8">
        {quizDataForm && (
          <Survey.Survey 
          json={quizDataForm} 
          onComplete={handleOnComplete} 
          onUpdateQuestionCssClasses={customizeButton}/>
        )}
      </div>
    </>
  );
};

export default QuizPage;
