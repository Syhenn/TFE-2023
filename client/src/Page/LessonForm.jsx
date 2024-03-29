    import React, { useEffect, useState } from 'react';
    import { CKEditor } from '@ckeditor/ckeditor5-react';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import axios from "axios";
    import { fetchData, postData } from '../api/apiService';
    import { useNavigate } from 'react-router-dom';
    import Navbar from '../component/Navbar';
    import '../styleComponent/ckeditor.css';
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    const LessonForm = () => {
      const [lessonContent, setLessonContent] = useState('');
      const [courses, setCourses] = useState([]);
      const [selectedCourse, setSelectedCourse] = useState("");
      const [selectedChapter, setSelectedChapter] = useState("");
      const [chapterTitle, setChapterTitle] = useState("");
      const [chapters, setChapters] = useState([]);
      const [userData, setUserData] = useState("");
      const [showDropdown, setShowDropdown] = useState(false);
      const [importMode, setImportMode] = useState(false);
      const [pdfFile, setPdfFile] = useState(null);

      const navigate = useNavigate();

      const fetchChapters = async (courseId) => {
        try {
          const chaptersReponse = await fetchData('/Chapter', { courseId });
          setChapters(chaptersReponse);
          setSelectedChapter(chaptersReponse[0]);
        } catch (error) {
          console.log(error)
        }
      };

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
                    fetchChapters(userCourses[0].id);
                }else if(userRole == 2){
                    setCourses(coursesResponse);
                    setSelectedCourse(coursesResponse[0]);
                    fetchChapters(coursesResponse[0].id);
                }
            }
          } catch (error) {
            console.log(error);
          }
        };

        fetchDataUser();
      }, []);

      const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setLessonContent(data);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        var selectedChapterId = selectedChapter.id;
        let title = chapterTitle;

        if (importMode && pdfFile) {
          try {
            const formData = new FormData();
            formData.append("pdfFile", pdfFile);
            formData.append("title", title);

            const response = await axios.post('https://localhost:7227/Document', formData, {
              headers: {
                'Content-Type': 'multipart/form-data', 
              },
            });
            var pdfId = response.data.id;
            let lessonPdfDto = {
              Title: title,
              ChapterId: selectedChapter,
              DocumentPdfId: pdfId
            }
            console.log(lessonPdfDto);
            postData('/Lesson/lessonPdf', lessonPdfDto);
          } catch (error) {
            console.error("Erreur lors de l'envoi du fichier PDF :", error);
            toast.error("Erreur lors de l'envoi du fichier PDF", {autoClose:5000});
          }
        } else {
          var lessonDto = {
            Title: title,
            ChapterId: selectedChapter.id,
            HtmlContent: lessonContent
          };
          console.log(lessonDto);
          postData('/Lesson', lessonDto);
        }

        navigate('/dashboard');
      };

      const handleCourseChange = async (course) => {
        setSelectedCourse(course);
        fetchChapters(course);
      };

      const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file != null) {
          if (file.type !== 'application/pdf') {
            toast.error("Le fichier doit être au format PDF", { autoClose: 5000 });
            e.target.value = null;
          } else {
            setPdfFile(file); 
            toast.success("Fichier PDF sélectionné : " + file.name);
          }
        }
      };
      
      return (
        <div className="min-h-screen">
          {userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify}/>)}
          <div className="container mx-auto py-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900">Création d'un cours</h2>
            </div>
            <div className="mb-6 mr-10 ml-10">
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
            <div className="mb-6 mr-10 ml-10">
              <p className="text-gray-700 mb-2">À quel chapitre de ce cours ajouter une leçon :</p>
              {selectedChapter !== null && (
                <select
                  value={selectedChapter ? selectedChapter.id : ""}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-4 w-full"
                >
                  {chapters.map((chapter, index) => (
                    <option key={index} value={chapter.id}>{chapter.title}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="mb-6 mr-10 ml-10">
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
                {!importMode && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={lessonContent}
                    onChange={handleEditorChange}
                  />
                )}
                {importMode && (
                  <div>
                    <label className="text-gray-700 mb-2 block">Sélectionnez un fichier PDF :</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="border border-gray-300 rounded-md py-2 px-4 w-full"
                    />
                  </div>
                )}
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
            <div className="flex justify-center">
              <button
                onClick={() => setImportMode(!importMode)}
                className="group relative w-1/2 flex justify-center mt-4 py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-900 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {importMode ? "Annuler l'importation PDF" : "Importer depuis un PDF"}
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      );
    };

    export default LessonForm;
