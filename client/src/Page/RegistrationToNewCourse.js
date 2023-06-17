import React, { useEffect, useState } from 'react';
import { fetchData, postData } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../component/Navbar';
const RegistrationToNewCourse = () => {
  const [userData, setUserData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
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
        const coursesResponse = await fetchData('/Language');
        setCourses(coursesResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataUser();
    fetchCourses();
  }, []);

  const handleCourseChange = (event) => {
    const courseId = parseInt(event.target.value);
    const course = courses.find((c) => c.id === courseId);
    setSelectedCourse(course);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
        let userId = userData.id;
        let courseId = selectedCourse.id;
      var userLanguageDto = {
        UserId : userId,
        LanguageId : courseId
      };
      console.log(userLanguageDto);
      await postData('/UserLanguage', userLanguageDto );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
{userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} isVerify={userData.isVerify}/>)}      <div className="container mx-auto p-4">
      <div className="m-10 text-3xl text-center font-extrabold text-gray-900">
                <h1>Inscription à un nouveau cours</h1>
              </div>
        <form onSubmit={handleRegistrationSubmit}>
          <div className="mb-4">
            <label htmlFor="course" className="block font-medium mb-2">
              Sélectionnez un cours :
            </label>
            <select
              id="course"
              name="course"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedCourse?.id || ''}
              onChange={handleCourseChange}
            >
              <option value="">Sélectionnez un cours</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={!selectedCourse}
          >
            S'inscrire
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationToNewCourse;
