import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import DefaultPagesTemplate from './Components/DefaultPagesTemplate';
import { DarkModeProvider } from './Components/DarkModeContext';

const App = () => {
    return (
        <DarkModeProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<DefaultPagesTemplate />} />
            </Routes>
        </DarkModeProvider>
    );
};

export default App;