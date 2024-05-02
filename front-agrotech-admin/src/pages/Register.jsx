import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Nav from "../components/Nav"
import '../styles/Register.css'
import { Link, useNavigate } from "react-router-dom";
import { addUser } from '../service/userService';
import Footer from '../components/Footer';

function Register() {

    const [userRegister, setUserRegister] = useState({})
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        let newUser = { ...userRegister, rol: "admin", active: true }

        await addUser(newUser);
        navigate('/login')
    }
    function handleChange(e) {
        e.preventDefault();

        setUserRegister(prev => ({ ...prev, [e.target.name]: e.target.value }))

        return userRegister
    }
    return (
        <>
            <Nav />
            <div className="container"> 
                <form className="form" onSubmit={handleSubmit}> 
                    <label htmlFor='name'>Nombre</label>
                    <input type='text' name='name' id='name' onChange={handleChange} />

                    <label htmlFor='lastname'>Apellido</label>
                    <input type='text' name='lastname' id='lastname' onChange={handleChange} />

                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' onChange={handleChange} />

                    <label htmlFor='phone'>Telefono</label>
                    <input type='phone' name='phone' id='phone' onChange={handleChange} />

                    <label htmlFor='birthDate'>Fecha de nacimiento</label>
                    <input type='birthDate' name='birthDate' placeholder='año-mes-dia' id='birthDate' onChange={handleChange} />

                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' name='password' id='password' onChange={handleChange} />


                    <button className='btn-registrarme' type='submit'>Registrarme</button>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Register