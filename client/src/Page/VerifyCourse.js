import React, { useEffect, useState } from "react";
import { putData, fetchData, postData } from "../api/apiService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";

const VerifyCourse = () => {
  const [userData, setUserData] = useState(null);
  const [coursesToVerify, setCoursesToVerify] = useState([]);
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
        if (response.isVerify === false && response.userRole < 2) {
          navigate("/dashboard");
        }
        setUserData(response);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    const fetchCoursesToVerify = async () => {
      try {
        const courses = await fetchData("/Course");
        const coursesToVerify = courses.filter(
          (course) => course.isVerify === false
        );
        const coursesWithUserData = await Promise.all(
          coursesToVerify.map(async (course) => {
            const user = await fetchData(`/User/${course.createdBy}`);
            return {
              ...course,
              createdBy: user.displayName 
            };
          })
        );

        setCoursesToVerify(coursesWithUserData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCoursesToVerify();
    fetchDataUser();
  }, []);

  const handleVerifyCourse = async (courseId) => {
    try {
      let id = parseInt(courseId);
      var courseToVerifyResponse = await axios.put(`https://localhost:7227/Course/${id}`);
      toast.success("Ce cours a été créé", {autoClose: 5000});
      const updatedCourses = coursesToVerify.filter(
        (course) => course.id !== courseId
      );
      setCoursesToVerify(updatedCourses);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRefuseCourse = async (courseId) => {
    const confirmDelete = window.confirm(
        "Êtes-vous sûr de vouloir refuser ce cours ?"
      );
      if(confirmDelete){
        try {
            let id = parseInt(courseId);
            var courseToRefuseResponse = await axios.delete(`https://localhost:7227/Course/${id}`);
            const updatedCourses = coursesToVerify.filter(
                (course) => course.id !== courseId
              );
              setCoursesToVerify(updatedCourses);
        } catch (error) {
            console.log(error);
        }
      }

  }

  return (
    <>
      {userData != null && (
        <Navbar
          displayName={userData.displayName}
          role={userData.userRole}
          isVerify={userData.isVerify}
        />
      )}
      <div>
        <div>
        <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Validation d'un cours
            </h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Titre du cours</th>
                <th className="py-2 px-4 text-left">Description du cours</th>
                <th className="py-2 px-4 text-left">Créé par</th>
                <th className="py-2 px-4 text-left">Validations</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coursesToVerify.map((course, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{course.title}</td>
                  <td className="py-2 px-4">{course.description}</td>
                  <td className="py-2 px-4">{course.createdBy}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleVerifyCourse(course.id)}
                      className="text-white bg-green-500 px-2 py-1 rounded-md mr-5"
                    >
                      Vérifier
                    </button>
                    <button
                      onClick={() => handleRefuseCourse(course.id)}
                      className="text-white bg-red-500 px-2 py-1 rounded-md"
                    >
                      Refuser
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default VerifyCourse;
