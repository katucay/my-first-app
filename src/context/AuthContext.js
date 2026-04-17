import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load user on app start
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const { data } = await API.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setUser(data);
        } catch (err) {
          console.log('Invalid token removed');
          localStorage.removeItem('token');
          setUser(null);
        }
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  // 🔑 LOGIN FUNCTION
  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', {
      email,
      password
    });

    localStorage.setItem('token', data.token);
    setUser(data.user);

    return data.user;
  };

  // 🚪 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ⭐ CUSTOM HOOK (recommended gamitin instead of useContext)
export const useAuth = () => useContext(AuthContext);