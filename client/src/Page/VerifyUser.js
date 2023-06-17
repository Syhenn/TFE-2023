import React, { useEffect, useState } from "react";
import { putData, fetchData, postData } from "../api/apiService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";

const VerifyUser = () => {
  const [userData, setUserData] = useState(null);
  const [usersToVerify, setUsersToVerify] = useState([]);
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

    const fetchUsersToVerify = async () => {
      try {
        const users = await fetchData("/User");
        const usersToVerify = users.filter(
          (user) => user.userRole === 1 && user.isVerify === false
        );
        setUsersToVerify(usersToVerify);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsersToVerify();
    fetchDataUser();
  }, []);

  const handleVerifyUser = async (userId) => {
    try {
        let id = parseInt(userId);
        console.log(id)
      var userToVerifyResponse = await axios.put(`https://localhost:7227/User/${id}`);
      toast.success("Utilisateur validé", {autoClose: 5000});
      console.log(userToVerifyResponse);
      const updatedUsers = usersToVerify.filter(
        (user) => user.id !== userId
      );
      setUsersToVerify(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Pseudo</th>
            <th className="py-2 px-4 text-left">Nom</th>
            <th className="py-2 px-4 text-left">Prénom</th>
            <th className="py-2 px-4 text-left">Verifications</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usersToVerify.map((user, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{user.displayName}</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.surname}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleVerifyUser(user.id)}
                  className="text-white bg-green-500 px-2 py-1 rounded-md"
                >
                  Vérifier
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
};

export default VerifyUser;
