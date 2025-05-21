import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const users = [
  { email: 'user@example.com', password: '123456', role: 'customer' },
  { email: 'owner@example.com', password: 'admin123', role: 'owner' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      setUser(found);
      navigate(`/${found.role}`);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
