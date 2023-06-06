import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/apiService";
import axios from "axios";
import { GiPodiumWinner } from "react-icons/gi";

const LeaderBoard = () => {
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchDataUser = async () => {
      try {
        const response = await fetchData('/User/current-user');
        setUserData(response);
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    const fetchUsers = async () => {
      try {
        const usersResponse = await fetchData('/User');
        const quizAnswersResponse = await fetchData('/QuizAnswer');

        // Agréger les points par utilisateur
        const usersWithPoints = usersResponse.map(user => {
          const points = quizAnswersResponse
            .filter(answer => answer.userId === user.id)
            .reduce((totalPoints, answer) => totalPoints + answer.points, 0);

          return { ...user, points };
        });

        setUsers(usersWithPoints);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDataUser();
    fetchUsers();
  }, []);

  const sortedUsers = users.sort((a, b) => b.points - a.points);

  return (
    <>
    {userData!=null &&(<Navbar displayName={userData.displayName} role={userData.userRole} />)}
      <div className="container mx-auto mt-8">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold mr-2">
            <GiPodiumWinner className="inline-block mr-2 text-xl text-yellow-500" />
            Leaderboard
          </h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Pseudo</th>
              <th className="py-2 px-4 text-left">Nom</th>
              <th className="py-2 px-4 text-left">Prénom</th>
              <th className="py-2 px-4 text-left">Score</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers.map((user, index) => (
              <tr key={index}>
                <td className="py-2 px-4">{user.displayName}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.surname}</td>
                <td className="py-2 px-4">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LeaderBoard;
