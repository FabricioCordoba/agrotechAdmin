import React, { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../context/UserContext.jsx'
import Nav from '../components/Nav'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer.jsx';
import { jwtDecode } from "jwt-decode"
import "../styles/login.css"
import { Logo } from '../components/Logo.jsx';

function Login() {

    const { handleLogin } = useContext(UserContext);

    const [userLogin, setUserLogin] = useState({ email: '', password: '' });
    const notificacionRef = useRef(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLogin),
            });
            console.log("hola", userLogin);
            const data = await response.json();
            console.log("q es data", data);

            if (response.ok) {
                if (data) {
                    handleLogin(data);
                    navigate('/products');
                } else {
                    throw new Error('Usuario inactivo');
                }
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            notificacionRef.current.style.color = 'red';
            notificacionRef.current.innerHTML = error.message;
        }
    };
    const handleChange = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    };
    return (
        <>
        <div className='logo-login'>
        <Logo/>

        </div>
            <div className="container-form-login">
                <form className="form-login" onSubmit={handleSubmit}>
                    <label htmlFor="email" className='label-login'>Email</label>
                    <input type="text" name='email' id='email' className='input-login' placeholder='Ingrese su Email' onChange={handleChange} />
                    <label htmlFor="password" className='label-login'>Contraseña</label>
                    <input type="password" name='password' id='password' className='input-login' placeholder='Ingrese su Contraseña' onChange={handleChange} />
                    <p id="notificacion" ref={notificacionRef}></p>
                    <button className='btn-login' type='submit'>Iniciar sesión</button>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
export default Login;