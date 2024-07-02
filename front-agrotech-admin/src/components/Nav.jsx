
import { Logo } from "./Logo";
import "../styles/nav.css"
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { UserContext } from '../context/UserContext.jsx'
import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Nav() {
    const { user, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();

   
    const userName = user ? user.name : '';
    return (
        <>
            <div className="container-nav">
                <Logo />
               
                <nav className="container-list">
                    <ul className='navList'>

                        <li>{userName}</li>
                        <Link to={"/Register"}><li>Registrar Administrador</li></Link>
                        <Link to={"/"}><li onClick={handleLogout}>Cerrar Sesión</li></Link>

                    </ul>
                </nav>
            </div>
        </>
    )
}
export default Nav
