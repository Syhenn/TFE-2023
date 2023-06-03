import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/apiService';
import { useParams } from 'react-router-dom';
const LessonPage = () => {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    useEffect(() => {
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
    }, [lessonId]);

  return (
    <div>
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