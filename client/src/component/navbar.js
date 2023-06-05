import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCode, FiUser, FiLogOut, FiList } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineTrophy } from 'react-icons/ai';

const Navbar = ({ displayName }) => {
  const navigate = useNavigate();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleToolsDropdown = () => {
    setShowToolsDropdown(!showToolsDropdown);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowToolsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <nav className="bg-indigo-600 py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <Link
          to="/dashboard"
          className="text-white text-xl font-bold flex items-center space-x-2"
        >
          <AiOutlineHome className="text-2xl" />
          <h1 className="text-white text-xl font-bold">CodingTime</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="relative" ref={dropdownRef}>
          <button
            className="text-white text-xl font-bold flex items-center space-x-2 focus:outline-none"
            onClick={toggleToolsDropdown}
          >
            <FiList className="text-2xl" />
            <span>Outils</span>
          </button>
          {showToolsDropdown && (
            <div className="absolute right-0 left-0 mt-2 py-4 w-40 bg-white rounded shadow-lg">
              <Link
                to="/sandbox"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-200 flex items-center"
              >
                <FiCode className="text-lg mr-2" />
                <span>Sandbox</span>
              </Link>
              <Link
                to="/quizChoice"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-200 flex items-center"
              >
                <AiOutlineHome className="text-lg mr-2" />
                <span>Quiz Choice</span>
              </Link>
              <Link
                to="/leaderboard"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-200 flex items-center"
              >
                <AiOutlineTrophy className="text-lg mr-2" />
                <span>Leaderboard</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {displayName && (
          <div className="flex items-center space-x-2 text-white mr-4">
            <FiUser className="text-xl" />
            <span>{displayName}</span>
          </div>
        )}
        <button
          className="text-white text-lg flex items-center space-x-2 focus:outline-none"
          onClick={handleLogout}
        >
          <FiLogOut className="text-xl" />
          <span>Déconnexion</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
