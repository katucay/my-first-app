import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar';

import SplashPage from './Pages/SplashPage';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import CreatePostPage from './Pages/CreatePostPage';
import EditPostPage from './Pages/EditPostPage';
import AdminPage from './Pages/AdminPage';

import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar />}

      <Routes>
        <Route path="/" element={<SplashPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/profile"
          element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
        />

        <Route
          path="/create-post"
          element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>}
        />

        <Route
          path="/edit-post/:id"
          element={<ProtectedRoute><EditPostPage /></ProtectedRoute>}
        />

        <Route
          path="/admin"
          element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;