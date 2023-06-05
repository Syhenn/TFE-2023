import React, { useState } from 'react';
import * as Survey from 'survey-react';

const QuestionCreationPage = () => {
  const [surveyModel, setSurveyModel] = useState(null);

  const handleSave = () => {
    const quizData = {
      Id: 1, 
      Name: surveyModel.title,
      Title: surveyModel.title,
      FakeAnswerOne: '', 
      FakeAnswerTwo: '', 
      CorrectAnswer: '',
    };

    // Effectuez une requête HTTP pour enregistrer les données du quiz
    // axios.post('/quiz', quizData)
    //   .then(response => {
    //     console.log('Quiz saved successfully');
    //   })
    //   .catch(error => {
    //     console.error('Failed to save quiz', error);
    //   });
  };

  const handleOnComplete = (survey) => {
    setSurveyModel(survey.data);
  };

  const surveyJson = {
    title: 'Création de question',
    showProgressBar: 'top',
    pages: [
      {
        questions: [
          {
            name: 'question',
            type: 'text',
            title: 'Question',
            isRequired: true,
          },
          {
            name: 'fakeAnswerOne',
            type: 'text',
            title: 'Fausse réponse 1',
            isRequired: true,
          },
          {
            name: 'fakeAnswerTwo',
            type: 'text',
            title: 'Fausse réponse 2',
            isRequired: true,
          },
          {
            name: 'correctAnswer',
            type: 'text',
            title: 'Réponse correcte',
            isRequired: true,
          },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Création de question</h2>
      {surveyModel ? (
        <div>
          <h3>Question enregistrée :</h3>
          <pre>{JSON.stringify(surveyModel, null, 2)}</pre>
        </div>
      ) : (
        <Survey.Survey
          json={surveyJson}
          onComplete={handleOnComplete}
        />
      )}
      {surveyModel && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
          onClick={handleSave}
        >
          Enregistrer la question
        </button>
      )}
    </div>
  );
};

export default QuestionCreationPage;
