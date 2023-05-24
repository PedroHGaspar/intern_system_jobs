import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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

// Inicializa o firebase
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
                // console.log('Usuário logado: ', user);
                // Vai pra página defaultTemplate quando o usuário estiver logado
                navigate('/dashboard');
            })
            .catch((error) => {
                // console.error('Erro no login:', error);
                setErrorMessage('E-mail ou senha inválidos.');
            });
    };

    const handleRegister = () => {
        navigate('/register'); // Vai pra página de Registrar
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <p>{errorMessage}</p>}
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
            </form>
        </div>
    );
};

export default Login;