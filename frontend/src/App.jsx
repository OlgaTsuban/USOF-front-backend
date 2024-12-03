import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
                    <Route
                        path="*"
                        element={<div>404 Not Found</div>} // Handle unmatched routes
                    />
      </Routes>
      <LogoutButton />
    </BrowserRouter>
  );
};

export default App;
