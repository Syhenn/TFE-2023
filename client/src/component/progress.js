import React from "react";
import { fetchData, postData } from "../api/apiService";
import { useEffect } from "react";
import { useState } from "react";
import { HiLockOpen, HiLockClosed } from "react-icons/hi";
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

        chaptersResponse.forEach(async (chapter, index) => {
          const lessonsResponse = await fetchData("/Lesson/getByChapter", {
            chapterId: chapter.id,
          });
          setLessons((prevLessons) => ({
            ...prevLessons,
            [chapter.id]: lessonsResponse,
          }));

          if (index === 0) {
            const firstLessonId = lessonsResponse[0]?.id;
            const isLessonCompleted = completedLessons.some(
              (completedLesson) => completedLesson.lessonId === firstLessonId
            );
              
            if (!isLessonCompleted) {
              const firstLessonCompleted = completedLessons.some(
                (completedLesson) => completedLesson.chapterId === chapter.id
              );
              if (!firstLessonCompleted) {
                let lessonCompletedDto = {
                  userId,
                  lessonId: firstLessonId,
                  chapterId: chapter.id
                };
                await postData("/CompletedLesson", lessonCompletedDto);
              }
            }
          }
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
      return "Complétez la leçon précédente pour continuer";
    }
    return "";
  };

  return (
    <div className="max-w-[100vw] h-[100vh] flex justify-start flex-col">
      {chapters !== null && (
        <>
          {chapters.map((chapter, index) => (
            <div
              className="flex flex-col items-center text-center pt-5 pb-5 pl-2 pr-2 bg-white rounded-lg border border-gray-300 shadow-2xl my-6 m-10 hover:shadow-3xl transition duration-300"
              key={index}
            >
              <div className="m-4 text-3xl font-extrabold text-gray-900">
                <h1>Chapitre {index+1} : {chapter.title}</h1>
              </div>
              {lessons[chapter.id] !== undefined && (
                <div className="flex justify-center flex-col sm:flex-row">
                  {lessons[chapter.id].map((lesson, indexLesson) => (
                    <div
                      className="flex flex-col items-center p-4 bg-gray-100 rounded-md border border-gray-200 shadow-md hover:bg-gray-200 transition duration-300 m-2"
                      key={indexLesson}
                    >
                      <button
                        onClick={() => navigateToLesson(lesson.id)}
                        className={`w-16 h-16 flex justify-center items-center rounded-full text-white text-2xl italic transform hover:scale-105 ${
                          isLessonCompleted(lesson.id)
                            ? "bg-indigo-600 cursor-pointer"
                            : "bg-gray-400"
                        }`}
                        disabled={!isLessonCompleted(lesson.id)}
                        title={getLessonStatusMessage(lesson.id, chapter)}
                      >
                        {isLessonCompleted(lesson.id) ? (
                          <HiLockOpen />
                        ) : (
                          <HiLockClosed />
                        )}
                      </button>
                      <div className="mt-3 text-lg text-center font-semibold text-gray-700">
                        <h1>{lesson.title}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );  
  
  
};

export default Progress;
