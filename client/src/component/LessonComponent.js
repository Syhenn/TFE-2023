import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const LessonComponent = () => {
    const [lesson, setLesson] = useState(null);
    useEffect(() => {
        try {
        } catch (error) {
            console.log(error);
        }
    })

  return (
    <div>
      <h1>{lesson.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: lesson.htmlContent }} />
    </div>
  );
};

export default LessonComponent;