import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCode, FiUser, FiLogOut, FiList, FiSettings  } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineTrophy } from 'react-icons/ai';

const Navbar = ({ displayName , role}) => {
  const navigate = useNavigate();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const toolsDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  const toggleToolsDropdown = () => {
    setShowToolsDropdown(!showToolsDropdown);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleOutsideClick = (event) => {
    if (
      (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target)) &&
      (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target))
    ) {
      setShowToolsDropdown(false);
      setShowProfileDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [displayName, role]);

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
      <div className="flex items-center justify-center">
        <div className="relative" ref={toolsDropdownRef}>
          <button
            className="text-white text-xl font-bold flex items-center space-x-2 focus:outline-none"
            onClick={toggleToolsDropdown}
          >
            <FiList className="text-2xl" />
            <span className="mx-auto">Outils</span>
          </button>
          {showToolsDropdown && (
            <div className="z-10 absolute right-0 left-0 mt-2 py-4 w-40 bg-white rounded shadow-lg">
              <Link
                to="/newCourse"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-200 flex items-center"
              >
                <FiCode className="text-lg mr-2" />
                <span>Apprendre</span>
              </Link>
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
                <span>Quiz</span>
              </Link>
              <Link
                to="/leaderboard"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-200 flex items-center"
              >
                <AiOutlineTrophy className="text-lg mr-2" />
                <span>Classement</span>
              </Link>
              {role > 0 && (
                <Link
                  to="/manageInterface"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-200 flex items-center"
                >
                  <FiSettings className="text-lg mr-2" />
                  <span>Administration</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {displayName && (
          <div className="relative" ref={profileDropdownRef}>
            <button
              className="text-white text-xl font-bold flex items-center space-x-2 focus:outline-none"
              onClick={toggleProfileDropdown}
            >
              <FiUser className="text-2xl" />
              <span className="mx-auto">{displayName}</span>
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 py-4 w-40 bg-white rounded shadow-lg">
                <Link
                  to="/editProfilePage"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-200 flex items-center"
                >
                  <FiUser className="text-lg mr-2" />
                  <span>Profile</span>
                </Link>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-200 flex items-center"
                  onClick={handleLogout}
                >
                  <FiLogOut className="text-lg mr-2" />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
