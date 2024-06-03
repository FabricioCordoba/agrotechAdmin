import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Nav from "../components/Nav";
import TablaCustomerPurchases from "../components/TablaCustomerPurchases";
import Sidebar from "../components/Sidebar";

const CustomerPurchases = () => {
    const { id } = useParams();  // Obtener el ID del cliente desde la URL
    

    return (
        <>
            <div>
                <Nav />
            </div>

            <div className="container-sidebar">
                <Sidebar />
                <div>
                    <TablaCustomerPurchases idUser={id} />  {/* Pasar el ID al componente de tabla */}
                </div>
            </div>
        </>
    );
};

export default CustomerPurchases;
