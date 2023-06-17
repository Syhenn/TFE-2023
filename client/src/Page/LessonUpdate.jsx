import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData, putData } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../styleComponent/ckeditor.css';


const LessonUpdate = () => {
    const [userData, setUserData] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [chapters, setChapters] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [lessonContent, setLessonContent] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const fetchDataUser = async () => {
            try {
              const response = await fetchData("/User/current-user");
              if(response.isVerify === false){
                navigate('/dashboard');
              }
              setUserData(response);
            } catch (error) {
              console.error(error);
              navigate("/");
            }
        };   
        const fetchCourses = async () => {
            try {
                const coursesResponse = await fetchData("/Course");
                if(coursesResponse !== null){
                    setCourses(coursesResponse);
                    setSelectedCourse(coursesResponse[0]);
                }
            } catch (error) {   
                console.log(error);
            }
        }
        fetchDataUser(); 
        fetchCourses();
    }, []);
    const handleCourseChange = (e) => {
        setSelectedCourse(e);
        fetchLesson(e);
    }
    const fetchLesson = async (courseId) => {
        try {
            var chaptersResponse = await fetchData('/Chapter', { courseId });
            setChapters(chaptersResponse);
            let allLessons = [];
            for (const chapter of chaptersResponse) {
                let chapterId = chapter.id;
                var lessonsResponse = await fetchData('/Lesson/getByChapter', { chapterId });
                allLessons = [...allLessons, ...lessonsResponse];
            }
            if (allLessons.length > 0) {
                setSelectedLesson(allLessons[0].id);
                fetchLessonContent(allLessons[0].id);
                setLessons(allLessons);
            } else {
                setSelectedLesson('');
                setLessons([]);
                toast.error('Ce cours ne contient pas de leçon');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleLessonChange = async (lessonId) => {
        setSelectedLesson(lessonId);
        await fetchLessonContent(lessonId);
    };
    const fetchLessonContent = async (lessonId) => {
        try {
          const lessonResponse = await fetchData('/Lesson', { lessonId });
          setLessonContent(lessonResponse.htmlContent);
        } catch (error) {
          console.log(error);
        }
      };
    const handleSubmit = async (event) => {
        event.preventDefault();
        let lesson = await fetchData('/Lesson', { lessonId: selectedLesson });
        var lessonDto = {
            Id : selectedLesson, 
            Title : lesson.title, 
            ChapterId : lesson.chapterId,
            HtmlContent : lessonContent
        };
        try {
            await putData('/Lesson', lessonDto);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="min-h-screen">
            {userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify}/>)}                <div className="container mx-auto py-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900">Modification d'une leçon</h2>
                    </div>
                    <div className="mb-6 mr-10 ml-10">
                        <p className="text-gray-700 mb-2">Pour quel cours modifier la leçon:</p>
                        {selectedCourse !== null && (
                            <select
                                value={selectedCourse}
                                onChange={(e) => handleCourseChange(e.target.value)}
                                className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            >
                                <option value="">Sélectionnez un cours</option>
                                {courses.map((course, index) => (
                                    <option key={index} value={course.id}>{course.title}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="mb-6 mr-10 ml-10">
                        {lessons !== null && lessons.length > 0 && (
                            <>
                            <p className="text-gray-700 mb-2">Modifier quelle leçon: </p>
                            <select
                                value={selectedLesson}
                                onChange={(e) => handleLessonChange(e.target.value)}
                                className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            >
                                <option value="">Sélectionnez une leçon</option>
                                {lessons.map((lesson, index) => (
                                    <option key={index} value={lesson.id}>{lesson.title}</option>
                                ))}
                            </select>
                            {selectedLesson && (
                                <>
                                <p className="text-gray-700 mb-2">Modifier la leçon</p>
                                <div className="flex justify-center w-full text-left">
                                <form id='ckeditor' onSubmit={handleSubmit} className="w-full max-w-screen-xl">
                                <CKEditor
                                editor={ClassicEditor}
                                data={lessonContent}
                                onChange={(event, editor) => {
                                    const content = editor.getData();
                                    setLessonContent(content);
                                }}
       
                                />
                                <div className="mt-8 flex justify-center">
                                <button
                                    type="submit"
                                    className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Mettre à jour ce cours
                                </button>
                                </div>
                                </form>
                                </div>
                            </>
                            )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default LessonUpdate;