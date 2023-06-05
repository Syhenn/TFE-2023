import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from "./Navbar";

const ManageInterface = () => {
  const [userData, setUserData] = useState(null);
  const [courseList, setCourseList] = useState(null);
  const [course, setCourse] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [titleChapter, setTitleChapter] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showAddLanguageForm, setShowAddLanguageForm] = useState(false);
  const [showAddChapterForm, setShowAddChapterForm] = useState(false);
  const [showAddLessonForm, setShowAddLessonForm] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    const fetchDataUser = async () => {
      try {
        const response = await axios.get("https://localhost:7227/User/current-user");
        setUserData(response.data);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    const fetchCourseList = async () => {
      try {
        const courseListResponse = await axios.get("https://localhost:7227/Course");
        setCourseList(courseListResponse.data);
      } catch (error) {
        
      }
    }
    fetchDataUser();
    fetchCourseList();
  }, [])
  
  const handleAddLanguage = () => {
    setShowAddLanguageForm(true);
  };

  const handleAddChapter = () => {
    console.log(titleChapter, course);
    setShowAddChapterForm(true);
  };

  const handleAddLesson = () => {
    setShowAddLessonForm(true);
  };
  const fetchChapterCreate = async (courseId) => {
    var createdChapter = {
      title : titleChapter,
      courseId
    };
    try {
      var chapterResponse = await axios.post("https://localhost:7227/Chapter", createdChapter);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChapterSubmit = async () => {
    try {
      var courseResponse = await axios.get("https://localhost:7227/Course/getByName", {
        params: {
          CourseName : courseName 
        }
      });
      fetchChapterCreate(courseResponse.data.id);
    } catch (error) {
      console.log(error);
    }
  }
  const handleAddCours = async () => {
    navigate('/courseForm');
  }
  return(
    <>
      {userData && <Navbar displayName={userData.displayName} />}
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Interface de gestion</h2>
            <h3 className="text-center text-2xl font-extrabold text-gray-500">Gestion des cours</h3>
            {(userData && userData.userRole > 0) && (
              <>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                  onClick={handleAddLanguage}
                >
                  Ajouter un nouveau langage
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                  onClick={handleAddCours}
                >
                  Ajouter un nouveau cours
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                  onClick={handleAddChapter}
                >
                  Ajouter un chapitre à un cours
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                  onClick={handleAddLesson}
                >
                  Ajouter une nouvelle leçon à un chapitre d'un cours
                </button>
              </>
            )}
            {(userData && userData.userRole > 1) && (
              <>
                <h3 className="text-center text-2xl font-extrabold text-gray-500">Interface administrateur</h3>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                >
                  Modifier un utilisateur
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                >
                  Supprimer un utilisateur
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Popup Form for Add Language */}
      {showAddLanguageForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Ajouter un nouveau langage</h2>
            <button
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mt-4"
              onClick={() => setShowAddLanguageForm(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Popup Form for Add Chapter */}
      {showAddChapterForm && (
        <>
        <div className="absolute inset-0 bg-gray-500 opacity-75">
        </div>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Ajouter un chapitre à un cours</h2>
            <form className="mt-8 space-y-6" onSubmit={handleChapterSubmit}>
          <div>
            <label htmlFor="titleChapter" className="label-t-input-form">
              Titre du chapitre
            </label>
            <input
              id="titleChapter"
              name="titleChapter"
              type="titleChapter"
              onChange={(e) => setTitleChapter(e.target.value)}
              className="input-log-form"
            />
          </div>
          <div>
          <label htmlFor="courseName" className="label-t-input-form">
              Pour le cours :
            </label>
            <select onChange={(e) => setCourseName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-[5px]">
              {courseList.map((course) =>(
                <option
                 key={course.id} 
                 value={course.title}>
                  {course.title}
                  </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ajouter ce chapitre
            </button>
            </div>
        </form>
            <button
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mt-4"
              onClick={() => setShowAddChapterForm(false)}
            >
              Fermer
            </button>
          </div>
        </div>
        </>
      )}

      {/* Popup Form for Add Lesson */}
      {showAddLessonForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Ajouter une nouvelle leçon à un chapitre d'un cours</h2>
            <button
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mt-4"
              onClick={() => setShowAddLessonForm(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageInterface;