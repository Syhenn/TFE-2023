import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Register from "./Page/Register";
import Login from './Page/Login';
import Dashboard from './Page/Dashboard';
import ManageInterface from "./Page/ManageInterface";
import Sandbox from './Page/Sandbox';
import CourseForm from "./Page/CourseForm";
import QuestionCreationPage from './component/SurveyComponent';
import LessonPage from './Page/LessonPage';
import QuizPage from "./Page/QuizPage";
import QuizChoice from "./Page/QuizChoice";
import CreateQuizForm from "./Page/CreateQuizForm";
import LeaderBoard from "./Page/Leaderboard";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />}/>
    <Route path="register" element={<Register />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="sandbox" element={<Sandbox />} />
    <Route path='manageInterface' element={<ManageInterface />}/>
    <Route path='courseForm' element={<CourseForm />}/>
    <Route path='lesson/:lessonId' element={<LessonPage />}/>
    <Route path='quizCreate' element={<QuestionCreationPage />}/>
    <Route path='quizChoice' element={<QuizChoice />}/>
    <Route path='quizPage/:courseId' element={<QuizPage /> }/>
    <Route path='leaderboard' element={<LeaderBoard /> }/>
    <Route path='createQuizForm' element={<CreateQuizForm/> }/>
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
