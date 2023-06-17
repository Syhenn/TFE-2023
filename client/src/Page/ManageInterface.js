import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { putData, postData, fetchData, deleteData } from "../api/apiService";
import axios from "axios";
import Navbar from "../component/Navbar";

const ManageInterface = () => {
  const [userData, setUserData] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [titleChapter, setTitleChapter] = useState(null);
  const [showDeleteUserPopup, setShowDeleteUserPopup] = useState(false);
  const [userEmailToDelete, setUserEmailToDelete] = useState("");
  const token = localStorage.getItem("token");
  const [showAddLanguageForm, setShowAddLanguageForm] = useState(false);
  const [showAddChapterForm, setShowAddChapterForm] = useState(false);
  const [showAddLessonForm, setShowAddLessonForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
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
    const fetchCourseList = async () => {
      try {
        const courseListResponse = await fetchData("/Course");
        setCourseName(courseListResponse[0].title);
        setCourseList(courseListResponse);
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
    setShowAddChapterForm(true);
  };
  const fetchChapterCreate = async (courseId) => {
    var createdChapter = {
      title: titleChapter,
      courseId
    };
    try {
      var createChapterResult = await postData("/Chapter", createdChapter);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    } 
  };
  const handleChapterSubmit = async () => {
    if (courseName === "") {
      return;
    }
    try {
      var courseResponse = await fetchData("/Course/getByName", { courseName });
      fetchChapterCreate(courseResponse.id);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async () => {
    try {
      await deleteData("/User", userEmailToDelete)
      setShowDeleteUserPopup(false); 
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddCours = async () => {
    navigate('/courseForm');
  }
  const handleAddQuiz = async () => {
    navigate('/createQuizForm');
  }
  const showDeleteUser = (email) => {
    setUserEmailToDelete(email);
    setShowDeleteUserPopup(true);
  };
  const handleUserEdit = () => {
    navigate('/userEditPage');
  }
  const handleDeleteLesson = () => {
    navigate('/deleteLesson');
  }
  const handleUpdateLesson = () => {
    navigate('/updateLesson');
  }
  const handleDeleteChapter = () => {
    navigate('/deleteChapter');
  }
  const handleUpdateQuiz = () => {
    navigate('/updateQuiz');
  }
  return(
    <>
{userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify}/>)}      
<div className="flex justify-center items-center w-full h-full">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Interface de gestion</h2>
            <h3 className="text-center text-2xl font-extrabold text-gray-500">Gestion des cours</h3>
            {(userData && userData.userRole > 0) && (
              <>
                <h4 className="text-center text-xl font-extrabold text-gray-400">Chapitre</h4>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                  onClick={handleAddChapter}
                >
                  Ajouter un chapitre à un cours
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-purple-950 hover:bg-purple-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-5 mt-5"
                  onClick={handleDeleteChapter}
                >
                  Supprimer un chapitre
                </button>
                <h4 className="text-center text-xl font-extrabold text-gray-400">Quiz</h4>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                  onClick={handleAddQuiz}
                >
                  Ajouter un nouveau quiz
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                  onClick={handleUpdateQuiz}
                >
                  Modifier un quiz
                </button>
                <h4 className="text-center text-xl font-extrabold text-gray-400">Leçon</h4>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                  onClick={handleAddCours}
                >
                  Ajouter une nouvelle leçon
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-500 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-5 mt-5"
                  onClick={handleUpdateLesson}
                >
                  Modifier une leçon
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-purple-950 hover:bg-purple-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-5 mt-5"
                  onClick={handleDeleteLesson}
                >
                  Supprimer une leçon
                </button>
              </>
            )}
            {(userData && userData.userRole > 1) && (
              <>
                <h3 className="text-center text-2xl font-extrabold text-gray-500">Interface administrateur</h3>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-5 mt-5"
                  onClick={handleUserEdit}
                >
                  Modifier un utilisateur
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border 
                  border-transparent text-sm font-medium rounded-md text-white bg-purple-950 hover:bg-purple-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-5 mt-5"
                  onClick={() => showDeleteUser(userData.email)}
                >
                  Supprimer un utilisateur
                </button>
              </>
            )}
          </div>
        </div>
      </div>

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
                 value={course.id}>
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
      {showDeleteUserPopup && (
        <>
        <div className="absolute inset-0 bg-gray-500 opacity-75">
        </div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Supprimer un utilisateur</h2>
            <p>Veuillez entrer l'adresse e-mail de l'utilisateur à supprimer :</p>
            <input
              type="email"
              className="border w-full border-gray-300 rounded-md px-3 py-2 mt-2"
              value={userEmailToDelete}
              onChange={(e) => setUserEmailToDelete(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="py-2 px-4 bg-purple-950 text-white rounded-md hover:bg-purple-700 mr-2"
                onClick={deleteUser}
              >
                Supprimer
              </button>
              <button
                className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                onClick={() => setShowDeleteUserPopup(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}

export default ManageInterface;