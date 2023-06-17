import React from "react";
import { fetchData, postData } from "../api/apiService";
import { useEffect } from "react";
import { useState } from "react";

import { HiOutlineChevronDoubleDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Progress = ({ courseId, userId }) => {
  const [chapters, setChapters] = useState(null);
  const [lessons, setLessons] = useState({});
  const [completedLessons, setCompletedLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const chaptersResponse = await fetchData("/Chapter", { courseId });
        setChapters(chaptersResponse);

        chaptersResponse.forEach(async (chapter) => {
          const lessonsResponse = await fetchData("/Lesson/getByChapter", {
            chapterId: chapter.id,
          });
          setLessons((prevLessons) => ({
            ...prevLessons,
            [chapter.id]: lessonsResponse,
          }));
        });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCompletedLessons = async () => {
      try {
        const completedLessonResponse = await fetchData("/CompletedLesson", {
          userId,
        });
        setCompletedLessons(completedLessonResponse);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChapters();
    fetchCompletedLessons();
  }, [courseId, userId]);

  const navigateToLesson = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.some(
      (completedLesson) => completedLesson.lessonId === lessonId
    );
  };

  const getLessonStatus = (lessonId, chapter) => {
    if (isLessonCompleted(lessonId)) {
      return "completed";
    } else {
      const lessonIndex = lessons[chapter.id].findIndex(
        (lesson) => lesson.id === lessonId
      );
      const previousLesson = lessons[chapter.id][lessonIndex - 1];
      if (previousLesson && !isLessonCompleted(previousLesson.id)) {
        return "locked";
      } else {
        return "available";
      }
    }
  };

  const getLessonStatusMessage = (lessonId, chapter) => {
    const status = getLessonStatus(lessonId, chapter);
    if (status === "locked") {
      return "Complétez la leçon d'avant pour continuer";
    }
    return "";
  };

  return (
    <div className="container w-screen h-full flex justify-center flex-col">
      {chapters !== null && (
        <>
          {chapters.map((chapter, index) => (
            <div className="flex flex-col items-center" key={index}>
              <div className="m-10 text-3xl font-extrabold text-gray-900">
                <h1>{chapter.title}</h1>
              </div>
              {lessons[chapter.id] !== undefined && (
                <>
                  {lessons[chapter.id].map((lesson, indexLesson) => (
                    <div
                      className="w-full flex flex-col justify-center items-center"
                      key={indexLesson}
                    >
                      <button
                      onClick={() => navigateToLesson(lesson.id)}
                      className={`z-0 w-24 h-24 flex justify-center items-center rounded-full text-white text-5xl italic shadow-xl transform scale-105 perspective-100 ${
                        isLessonCompleted(lesson.id)
                          ? "bg-indigo-600 cursor-pointer"
                          : "bg-gray-400"
                      }`}
                      disabled={!isLessonCompleted(lesson.id)}
                      title={getLessonStatusMessage(lesson.id, chapter)}
                    >
                      {indexLesson + 1}
                    </button>
                      <div className="m-5 text-2xl font-bold text-gray-900">
                        <h1>{lesson.title}</h1>
                      </div>
                      <HiOutlineChevronDoubleDown className="text-5xl m-7" />
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Progress;
