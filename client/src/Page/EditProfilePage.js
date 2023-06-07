import React, { useState, useEffect } from 'react';
import { fetchData, putData } from '../api/apiService';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Navbar from '../component/Navbar';
const EditProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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

    fetchDataUser();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedUserData = { ...userData, name, email };
      await putData('/User', {updatedUserData}); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {userData != null && <Navbar displayName={userData.displayName} role={userData.userRole} />}
    <div className="container mx-auto p-4">
    <div className="m-10 text-3xl text-center font-extrabold text-gray-900">
      <h1 >Modifier les informations personnelles</h1>
      </div>
      {userData && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Nom :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Enregistrer
          </button>
        </form>
      )}
    </div>
    </>
  );
};

export default EditProfilePage;