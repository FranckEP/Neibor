import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext'; 
import Sidebar from '../components/Sidebar';
import HomePage from '../pages/Home';
import PerfilPage from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { Loader } from '@mantine/core';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="lg" color="blue" />
      </div>
    );
  }

  return (
    <div className="flex">
    {user && <Sidebar />}
    <main className={`${user ? 'ml-64' : ''} flex-1`}>
      <Routes>
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/perfil" element={user ? <PerfilPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </main>
  </div>
  );
};

// Wrap the App component with Router and AuthProvider
const AppWrapper: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
};

export default AppWrapper;
