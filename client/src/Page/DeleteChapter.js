import React, { useState, useEffect } from "react";
import { fetchData, deleteData } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../component/Navbar";

const DeleteChapter = () => {
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [chapters, setChapters] = useState([]);
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
        if (coursesResponse !== null) {
          setCourses(coursesResponse);
          setSelectedCourse(coursesResponse[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataUser();
    fetchCourses();
  }, []);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    fetchChapters(e.target.value);
  };

  const fetchChapters = async (courseId) => {
    try {
      const chaptersResponse = await fetchData("/Chapter", { courseId });
      setChapters(chaptersResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChapterChange = (chapterId) => {
    setSelectedChapter(chapterId);
  };

  const deleteChapter = async (chapterId) => {
    const chapterLessons = await fetchData("/Lesson/getByChapter", {
      chapterId,
    });

    if (chapterLessons.length === 0) {
      const confirmDelete = window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce chapitre ?"
      );
      if (confirmDelete) {
        try {
          await deleteData(`/Chapter/${chapterId}`);
          navigate("/dashboard");
        } catch (error) {
          console.log(error);
          toast.error(
            "Une erreur s'est produite lors de la suppression du chapitre"
          );
        }
      }
    } else {
      toast.error("Ce chapitre contient des leçons. Supprimez d'abord les leçons.");
    }
  };

  return (
    <>
      <div className="min-h-screen">
      {userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify}/>)}
        <div className="container mx-auto py-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Suppression d'un chapitre
            </h2>
          </div>
          <div className="mb-6 mr-10 ml-10">
            <p className="text-gray-700 mb-2">
              Pour quel cours supprimer un chapitre:
            </p>
            {selectedCourse !== null && (
              <select
                value={selectedCourse}
                onChange={handleCourseChange}
                className="border border-gray-300 rounded-md py-2 px-4 w-full"
              >
                <option value="">Sélectionnez un cours</option>
                {courses.map((course, index) => (
                  <option key={index} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          <p className="text-gray-700 mb-2 mr-10 ml-10">Supprimer quel chapitre: </p>
          <div className="mb-6 mr-10 ml-10 flex flex-col items-center">
            {chapters !== null && chapters.length > 0 && (
              <>
                <select
                  value={selectedChapter}
                  onChange={(e) => handleChapterChange(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-4 w-full mb-5"
                >
                  <option value="">Sélectionnez un chapitre</option>
                  {chapters.map((chapter, index) => (
                    <option key={index} value={chapter.id}>
                      {chapter.title}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => deleteChapter(selectedChapter)}
                  className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Supprimer
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DeleteChapter;
