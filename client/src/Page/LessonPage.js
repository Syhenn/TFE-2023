import React, { useEffect, useState } from 'react';
import { fetchData, postData } from '../api/apiService';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import axios from 'axios';
import Viewer from 'react-viewer';

const LessonPage = () => {
  const { lessonId } = useParams();
  const [userData, setUserData] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [nextLessonId, setNextLessonId] = useState(null);
  const [document, setDocument] = useState(null);
  const [url, setUrl] = useState(null);
  const [pdfReady, setPdfReady] = useState(false);
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
        fetchCompletedLesson(response.id);
        fetchNextLessonId();
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    const fetchLesson = async () => {
      try {
        const lessonResponse = await fetchData('/Lesson', { lessonId });
        if(lessonResponse.documentId !== null){
            var docId = lessonResponse.documentId;
            var documentResponse = await fetchData('/Document', {docId});
            setDocument(documentResponse);
            var blob = base64toBlob(documentResponse.pdfData);
            var url = URL.createObjectURL(blob);
            console.log(url);
            setUrl(url);
            setPdfReady(true);
        }
        setLesson(lessonResponse);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCompletedLesson = async (userId) => {
      try {
        const completedLesson = await fetchData('/CompletedLesson', { userId });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNextLessonId = async () => {
      try {
        const nextLessonResponse = await fetchData('/Lesson/nextLesson', { lessonId });
        setNextLessonId(nextLessonResponse.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLesson();
    fetchDataUser();
  }, [lessonId]);

  const handleLessonCompletion = async () => {
    const completedLessonDto = {
      userId: userData.id,
      lessonId: nextLessonId
    };
    try {
      await postData('/CompletedLesson', completedLessonDto);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
};
  return (
    <div>
      {userData != null && (
        <Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify} />
      )}
      {lesson != null && (
        <>
          {lesson.htmlContent != null && (
            <div className="m-10">
              <div id='ckeditor' className="text-left" dangerouslySetInnerHTML={{ __html: lesson.htmlContent }} />
            </div>
          )}
          {lesson.htmlContent == null && (
            <div>
              {document != null && (
                <div>
                  {pdfReady && (
                    <div>
                      <Viewer
                        visible={pdfReady}
                        onClose={() => setPdfReady(false)}
                        images={[{ src: url, alt: 'PDF' }]}
                      />
                    </div>
                  )}
                </div>
              )}
              {document == null && (
                <p>Leçon sans contenu HTML ni PDF.</p>
              )}
            </div>
          )}
          <div className="text-center mt-4">
            <button
              className="px-4 py-2 mb-5 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              onClick={handleLessonCompletion}
            >
              J'ai terminé cette leçon
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LessonPage;
