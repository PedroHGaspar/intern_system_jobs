import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { IoMdMoon } from 'react-icons/io';
import 'firebase/compat/auth';
import { FaMoon } from 'react-icons/fa';
import '../style/login.css';
import Logo from '../images/logo.png';
import LogoWhite from '../images/logo-white.png';
import { DarkModeContext } from './DarkModeContext';


const firebaseConfig = {
  // Configurações do Firebase
};

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Você precisa informar corretamente o e-mail e a senha.');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/dashboard');
      })
      .catch((error) => {
        setErrorMessage('E-mail ou senha inválidos.');
      });
  };

  const handleRegister = () => {
    navigate('/register');
  };

  

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <img src={darkMode ? LogoWhite : Logo} alt="Logo" className="logo" />
      <div>
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <button type="button" onClick={handleRegister}>
            Registrar
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
      <button className="dark-mode-button" onClick={toggleDarkMode}>
        <FaMoon />
      </button>
    </div>
  );
};

export default Login;
