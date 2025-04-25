import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext'; // Adjust the import based on your project structure
import Sidebar from '../components/Sidebar';
import HomePage from '../pages/Home';
import PerfilPage from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or similar
  }

  return (
    <div className="flex">
      {user && <Sidebar />}
      <main className="flex-1">
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
