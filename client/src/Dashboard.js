import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../src/component/navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7227/User/current-user");
        const userLanguageResponse = await axios.put("https://localhost:7227/UserLanguage", {
          userId : response.data.id
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    fetchData();
  }, []);
  if (userData === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar displayName={userData.displayName} />
    </>
  );
};

export default Dashboard;