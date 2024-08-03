import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Nav from "../components/Nav";
import TablaCustomerPurchases from "../components/TablaCustomerPurchases";
import Sidebar from "../components/Sidebar";
import "../styles/customerPurchases.css"
import Footer from '../components/Footer';

const CustomerPurchases = () => {
    const { id } = useParams();  // Obtener el ID del cliente desde la URL


    return (
        <>
            <div className='container-general-purchases'>
                <div className='nav'>
                    <Nav />
                </div>

                <div className="container-purchases-sidebar">
                    <div className='container-sidebar'>
                    <Sidebar />
                        </div>
                    <div className='content'>
                        <TablaCustomerPurchases idUser={id} />  {/* Pasar el ID al componente de tabla */}
                    </div>
                </div>
                <Footer/>
            </div>

        </>
    );
};

export default CustomerPurchases;
