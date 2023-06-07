import React, { useEffect, useState } from 'react';
import { fetchData, postData, putData  } from '../api/apiService';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import axios from 'axios';

const UserEditPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const [user, setUser] = useState({
    Name: '',
    Surname: '',
    DisplayName: '',
    Email: '',
    Age: 0
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchEmail);
    try {
      const response = await fetchData(`/User/userMail`, { email: searchEmail });
      setSearchResult(response);
      setUser({
        Name : response.Name,
        Surname: response.Surname,
        DisplayName: response.DisplayName,
        Email: response.Email,
        Age: response.Age
      });
    } catch (error) {
      console.error(error);
      setSearchResult(null);
      setUser({
        Name: '',
        Surname: '',
        DisplayName: '',
        Email: '',
        Age: 0
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(user);
    try {
      await putData(`/User`, user);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Modifier l'utilisateur</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchEmail">
              Rechercher par email
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="searchEmail"
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSearch}
              >
                Rechercher
              </button>
            </div>
          </div>
          {searchResult && (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nom
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="Name"
                  value={user.Name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                  Prénom
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="surname"
                  type="text"
                  name="Surname"
                  value={user.Surname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                  Nom d'affichage
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="displayName"
                  type="text"
                  name="DisplayName"
                  value={user.DisplayName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="Email"
                  value={user.Email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                  Âge
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="age"
                  type="number"
                  name="Age"
                  value={user.Age}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? 'En cours...' : 'Enregistrer'}
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => navigate('/dashboard')}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;
