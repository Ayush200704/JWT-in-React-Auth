import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

const App = () => {

  return <Router>
    <AuthProvider>
      <Routes>
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute Component={Dashboard} />} />
      </Routes>
    </AuthProvider >
  </Router>

}

const ProtectedRoute = ({ Component: Component }) => {
  const { isAuth } = useAuth();

  return isAuth ? <Component /> : <Login />
}

export default App