import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData, deleteData } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Navbar from "../component/Navbar";
const DeleteLesson = () => {
    const [userData, setUserData] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [chapters, setChapters] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState('');

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
                fetchCourses(response.id, response.userRole);
            } catch (error) {
              console.error(error);
              navigate("/");
            }
        };   
        const fetchCourses = async (userId, userRole) => {
            try {
                const coursesResponse = await fetchData("/Course");
                if(coursesResponse !== null){
                    if(userRole == 1){
                        const userCourses = coursesResponse.filter((course) => course.createdBy === userId);
                        setCourses(userCourses);
                        setSelectedCourse(userCourses[0]);
                    }else if(userRole == 2){
                        setCourses(coursesResponse);
                        setSelectedCourse(coursesResponse[0]);
                    }
                }
            } catch (error) {   
                console.log(error);
            }
        }
        fetchDataUser(); 
    }, []);
    const handleCourseChange = (e) => {
        setSelectedCourse(e);
        fetchLesson(e);
    }
    const fetchLesson = async (courseId) => {
        console.log(courseId);
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
    const handleLessonChange = (lessonId) => {
        setSelectedLesson(lessonId);
      };
      
      const deleteLesson = async (lessonId) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette leçon ?');
        if (confirmDelete) {
          try {
            await deleteData(`/Lesson/${lessonId}`);
            navigate('/dashboard');
          } catch (error) {
            console.log(error);
            toast.error("Une erreur s'est produite lors de la suppression de la leçon");
          }
        }
      };
    return (
        <>
            <div className="min-h-screen">
                {userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify}/>)}                <div className="container mx-auto py-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900">Suppression d'une leçon</h2>
                    </div>
                    <div className="mb-6 mr-10 ml-10">
                        <p className="text-gray-700 mb-2">Pour quel cours supprimer la leçon:</p>
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
                    
                    <p className="text-gray-700 mb-2 mr-10 ml-10">Supprimer quelle leçon: </p>
                    <div className="mb-6 mr-10 ml-10 flex flex-col items-center">
                        {lessons !== null && lessons.length > 0 && (
                            <>
                            <select
                                value={selectedLesson}
                                onChange={(e) => handleLessonChange(e.target.value)}
                                className="border border-gray-300 rounded-md py-2 px-4 w-full mb-5"
                            >
                                <option value="">Sélectionnez une leçon</option>
                                {lessons.map((lesson, index) => (
                                    <option key={index} value={lesson.id}>{lesson.title}</option>
                                ))}
                            </select>
                            <button onClick={() => deleteLesson(selectedLesson)} className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Supprimer</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default DeleteLesson;