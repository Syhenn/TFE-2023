import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { fetchData, postData } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

const CourseForm = () => {
  const [lessonContent, setLessonContent] = useState('');
  const [courses, setCourses] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapters, setChapters] = useState({});
  const [userData, setUserData] = useState(null);
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
        const chaptersReponse = await fetchData('/Chapter', {courseId});
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
    let title = "Test";
    var chapterDto = {
      Title : title,
      ChapterId : selectedChapterId,
      HtmlContent : lessonContent
    }
    console.log(chapterDto);
    var response = postData('/Lesson', chapterDto);
  };
  const handleCourseChange = async (course) => {
    setSelectedCourse(course)
    fetchChapters(course);
  }  
  const handleChapterChange = async (chapter) => {
    setSelectedChapter(chapter);
  }

  const editorConfiguration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'alignment',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'link',
      'blockQuote',
      'code',
      '|',
      'undo',
      'redo',
    ],
  };

  return (
    <div>
      {userData != null && <Navbar displayName={userData.displayName} />}
      <div className="container mx-auto mt-8">
        <div>
          <p>A quel cours ajouter une leçon : </p>
          {selectedCourse !== null && (
            <select
              value={selectedCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
            >
              {courses.map((course, index) => (
                <option key={index} value={course.id}>{course.title}</option>
              ))}
            </select>
          )}
        </div>
        <div>
          <p>A quel chapitre de ce cours ajouter une leçon : </p>
          {selectedChapter !== null && (
            <select
              value={selectedChapter}
              onChange={(e) => handleChapterChange(e.target.value)}
            >
              {chapters.map((chapter, index) => (
                <option key={index} value={chapter.id}>{chapter.title}</option>
              ))}
            </select>
          )}
        </div>
        <div className='flex justify-center flex-col'>
          <div className='w-full text-center mb-10 text-3xl font-extrabold text-gray-900'>
            <h2>Création d'un cours</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <CKEditor
              editor={ClassicEditor}
              data={lessonContent}
              config={editorConfiguration}
              onChange={handleEditorChange}
            />
            <div className='w-full mt-20 flex justify-center items-center'>
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
