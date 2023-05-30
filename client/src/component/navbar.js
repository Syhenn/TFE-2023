import { Link, useNavigate } from 'react-router-dom';
import { FiCode, FiUser, FiLogOut } from 'react-icons/fi';
import {AiOutlineHome} from 'react-icons/ai';

const Navbar = ({ displayName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

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
        <Link
          to="/sandbox"
          className="text-white text-xl font-bold flex items-center space-x-2"
        >
          <FiCode className="text-2xl" />
          <span>Sandbox</span>
        </Link>
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