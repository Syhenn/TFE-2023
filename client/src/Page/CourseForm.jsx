import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { fetchData, postData } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import '../styleComponent/ckeditor.css';

const CourseForm = () => {
  const [lessonContent, setLessonContent] = useState('');
  const [courses, setCourses] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterTitle, setChapterTitle] = useState(null);
  const [chapters, setChapters] = useState({});
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchDataUser = async () => {
      try {
        const response = await fetchData('/User/current-user');
        setUserData(response);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    const fetchCourses = async () => {
      try {
        const responseCourses = await fetchData('/Course');
        setCourses(responseCourses);
        setSelectedCourse(responseCourses[0]);
        fetchChapters(responseCourses[0].id);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchChapters = async (courseId) => {
      try {
        const chaptersReponse = await fetchData('/Chapter', { courseId });
        setChapters(chaptersReponse);
        setSelectedChapter(chaptersReponse[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchDataUser();
    fetchCourses();
  }, []);
  const fetchChapters = async (courseId) => {
    try {
      const chaptersReponse = await fetchData('/Chapter', {courseId});
      setChapters(chaptersReponse);
    } catch (error) {
      console.log(error)
    }
  }
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setLessonContent(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var selectedChapterId = selectedChapter.id;
    let title = chapterTitle;
    var chapterDto = {
      Title: title,
      ChapterId: selectedChapterId,
      HtmlContent: lessonContent
    }
    postData('/Lesson', chapterDto);
  };

  const handleCourseChange = async (course) => {
    setSelectedCourse(course)
    fetchChapters(course);
  };

  const handleChapterChange = async (chapter) => {
    setSelectedChapter(chapter);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-indigo-100 min-h-screen">
    {userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} />)}
      <div className="container mx-auto py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Création d'un cours</h2>
        </div>
        <div className="mb-6">
          <p className="text-gray-700 mb-2">À quel cours ajouter une leçon :</p>
          {selectedCourse !== null && (
            <select
              value={selectedCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
            >
              {courses.map((course, index) => (
                <option key={index} value={course.id}>{course.title}</option>
              ))}
            </select>
          )}
        </div>
        <div className="mb-6">
          <p className="text-gray-700 mb-2">À quel chapitre de ce cours ajouter une leçon :</p>
          {selectedChapter !== null && (
            <select
              value={selectedChapter}
              onChange={(e) => handleChapterChange(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
            >
              {chapters.map((chapter, index) => (
                <option key={index} value={chapter.id}>{chapter.title}</option>
              ))}
            </select>
          )}
        </div>
        <div className="mb-6">
          <label className="text-gray-700 mb-2 block" htmlFor="chapterTitle">Titre du cours à créer :</label>
          <input
            id="chapterTitle"
            type="text"
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            onChange={(e) => setChapterTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-center w-full text-left">
          <form id='ckeditor' onSubmit={handleSubmit} className="w-full max-w-screen-xl">
            <CKEditor
              editor={ClassicEditor}
              data={lessonContent}
              onChange={handleEditorChange}
            />
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Publier ce cours
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
