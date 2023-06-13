import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/Navbar";

const LessonUpdate = () => {
    const [userData, setUserData] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [chapters, setChapters] = useState([]);
    const [lessons, setLessons] = useState([]);
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
        console.log(courseId);
        try {
            var chaptersResponse = await fetchData('/Chapter', {courseId});
            chaptersResponse.forEach(element => {
                console.log(element);
            });
            console.log(chaptersResponse);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <div className="min-h-screen">
        {userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} />)}
            <div className="container mx-auto py-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900">Création d'un cours</h2>
                </div>
                <div className="mb-6">
                    <p className="text-gray-700 mb-2">Pour quel cours modifier la leçon:</p>
                        {selectedCourse !== null &&(
                        <select
                        value={selectedCourse}
                        onChange={(e) => handleCourseChange(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-4 w-full">
                            {courses.map((course, index) => (
                                <option key={index} value={course.id}>{course.title}</option>
                            ) )}
                        </select>
                        )}
                </div>
            </div>
        </div>
        </>
    );
}

export default LessonUpdate;