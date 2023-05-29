import React, { useState, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import { FaMoon, FaSun } from 'react-icons/fa';
import { DarkModeContext } from './DarkModeContext';
import Logo from '../images/logo.png';
import LogoWhite from '../images/logo-white.png';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(DarkModeContext);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = () => {
        if (!email || !password) {
            setErrorMessage('Você precisa digitar um e-mail e uma senha.');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage(
                'A senha precisa ter pelo menos uma letra maiúscula, uma letra minúscula, um número e no mínimo 6 caracteres.'
            );
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log('Usuário Registrado:', user);
                // Redirect or perform other actions after successful registration
                navigate('/login');
            })
            .catch((error) => {
                // console.error('Registro deu errado: ', error);
                setErrorMessage('O registro não foi concluído. Tente novamente.');
            });
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
        return passwordRegex.test(password);
    };

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };


    return (
        <div className={`login-container ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
            <div className='imgHeaderLogo'>
                <img src={isDarkTheme ? LogoWhite : Logo} alt="Logo" className="logo" />
            </div>
            <h2>Registre-se</h2>
            <form>
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="button" onClick={handleRegister}>
                    Registrar
                </button>
            </form>
            <div className='buttonLightMode'>
                <button
                    className={`theme-button ${isDarkTheme ? 'theme-dark' : 'theme-light'}`}
                    onClick={toggleTheme}
                >
                    <div className={`button-icon-container ${isDarkTheme ? 'slide-to-sun' : 'slide-to-moon'}`}>
                        <FaMoon className="moon-icon" />
                        <FaSun className="sun-icon" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Register;