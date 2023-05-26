import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import '../style/login.css'
import Logo from "../images/logo.png"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
      <div className="login-container">
        <img src={Logo}alt="Logo" className="logo" />
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
      </div>
    );
  };
  
  export default Login;