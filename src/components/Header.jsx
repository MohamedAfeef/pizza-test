import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); // Assuming you have a logout function in context

  const hideOnRoutes = ['/login'];

  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    logout();           // Clear auth state
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
      <h1 className="m-0">Cheesy Pizza</h1>
      <button className="btn btn-light btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
