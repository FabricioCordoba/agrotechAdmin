import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { GiClothes, GiRanchGate, GiFarmer, GiDrawbridge, GiLaserPrecision } from "react-icons/gi";
import { FaGears, FaTractor } from "react-icons/fa6";
import { TbCarCrane, TbGardenCart } from "react-icons/tb";
import { TfiSpray } from "react-icons/tfi";
import { MdSolarPower } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import "../styles/sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(location.pathname);

    function producsCategory(category) {
        setSelectedCategory(`/products/${category}`);
        navigate(`/products/${category}`);
    }

    return (
        <div className="container-general-sidebar">
            <ul className="ul-sidebars">
                <li className={selectedCategory === "/Products" ? "active" : ""}>
                    <Link to={"/Products"} onClick={() => setSelectedCategory("/Products")}>Productos</Link>
                </li>
                <h3>Categorias</h3>
                <div className='container-barra-category-products'>
                    <ul className='ul-bar-category'>
                        <li className={selectedCategory === "/products/Ferretería" ? "active" : ""} onClick={() => producsCategory("Ferretería")}>Ferretería  <HiOutlineWrenchScrewdriver /></li>
                        <li className={selectedCategory === "/products/Ropa de trabajo" ? "active" : ""} onClick={() => producsCategory("Ropa de trabajo")}>Ropa de trabajo <GiClothes /></li>
                        <li className={selectedCategory === "/products/Tranqueras" ? "active" : ""} onClick={() => producsCategory("Tranqueras")}>Tranqueras <GiRanchGate /></li>
                        <li className={selectedCategory === "/products/Repuestos agricolas" ? "active" : ""} onClick={() => producsCategory("Repuestos agricolas")}>Repuestos agricolas <FaGears /></li>
                        <li className={selectedCategory === "/products/Equipamiento vehículos" ? "active" : ""} onClick={() => producsCategory("Equipamiento vehículos")}>Equipamiento vehículos <TbCarCrane /></li>
                        <li className={selectedCategory === "/products/Pulverizacíon" ? "active" : ""} onClick={() => producsCategory("Pulverizacíon")}>Pulverizacíon <TfiSpray /></li>
                        <li className={selectedCategory === "/products/Construcción" ? "active" : ""} onClick={() => producsCategory("Construcción")}>Construcción <TbGardenCart /></li>
                        <li className={selectedCategory === "/products/Infraestructura" ? "active" : ""} onClick={() => producsCategory("Infraestructura")}>Infraestructura <GiDrawbridge /></li>
                        <li className={selectedCategory === "/products/Energias renovables" ? "active" : ""} onClick={() => producsCategory("Energias renovables")}>Energias renovables <MdSolarPower /></li>
                        <li className={selectedCategory === "/products/Maquinaria agrícola" ? "active" : ""} onClick={() => producsCategory("Maquinaria agrícola")}>Maquinaria agrícola <FaTractor /></li>
                        <li className={selectedCategory === "/products/Forestación y Jardinería" ? "active" : ""} onClick={() => producsCategory("Forestación y Jardinería")}>Forestación y Jardinería <GiFarmer /></li>
                        <li className={selectedCategory === "/products/Agricultura de precision" ? "active" : ""} onClick={() => producsCategory("Agricultura de precision")}>Agricultura de precision <GiLaserPrecision /></li>
                    </ul>
                </div>
                <li className={selectedCategory === "/Clients" ? "active" : ""}>
                    <Link to={"/Clients"} onClick={() => setSelectedCategory("/Clients")}>Clientes</Link>
                </li>
                <li className={selectedCategory === "/ventas" ? "active" : ""}>
                    <Link to={"/ventas"} className="sales" onClick={() => setSelectedCategory("/ventas")}>Ventas</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
