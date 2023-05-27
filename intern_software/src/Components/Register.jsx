import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import '../style/login.css'; 

const Register = () => {
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

    return (
        <div className={`login-container`}>
            <h2>Registre-se</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form>
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button type="button" onClick={handleRegister}>
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default Register;