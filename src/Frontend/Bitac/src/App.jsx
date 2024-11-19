import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import HomePage from './Pages/Home/Home';
import AboutPage from './Pages/About/About';
import LoginPage from './Pages/Login/Login';
import RegisterPage from './Pages/Register/Register';
import ProfilePage from './Pages/Profile/Profile';
import FieldLogs from './Pages/FieldLogs/FieldLogs'; 
import LogDetails from './Pages/LogDetails/LogDetails'; 
import CreateLog from './Pages/CreateLog/CreateLog'; 

import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/log/:id" element={<LogDetails />} />
            <Route path="/fieldlogs" element={<FieldLogs />} />
            <Route path="/createlog" element={<CreateLog />} />

            {/* Rutas protegidas */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
                     
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

