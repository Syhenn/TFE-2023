import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Register from "./Page/Register";
import Login from './Page/Login';
import Dashboard from './Page/Dashboard';
import ManageInterface from "./component/ManageInterface";
import Sandbox from './Page/Sandbox';
import CourseForm from "./Page/CourseForm";
import LessonPage from "./component/LessonPage";
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
    <Route path='lesson/:lessonId' element={<LessonPage/>}/>
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
