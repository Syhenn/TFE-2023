import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/apiService';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import axios from 'axios';
const LessonPage = () => {
    const { lessonId } = useParams();
    const [userData, setUserData] = useState(null);
    const [lesson, setLesson] = useState(null);
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
          const response = await fetchData('/User/current-user');
          setUserData(response);
        } catch (error) {
          console.error(error);
          navigate("/");
        }
      };
      const fetchLesson = async () => {
        console.log(lessonId);
        try {
          const lessonResponse = await fetchData('/Lesson', { lessonId });
          setLesson(lessonResponse);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchLesson();
      fetchDataUser();
    }, [lessonId]);

  return (
    <div>
    {userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} />)}
      {lesson != null &&(
        <div>

          <h1>{lesson.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: lesson.htmlContent }} />
        </div>
      )}
    </div>
  );
};

export default LessonPage;