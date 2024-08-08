import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <span className="text-2xl font-bold text-white">
        Welcome, {user.name}
      </span>
      <button 
        onClick={handleLogOut}
        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition duration-300"
      >
        Log Out
      </button>
    </nav>
  );
}