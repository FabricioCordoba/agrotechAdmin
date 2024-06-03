import React from 'react';
import Ventas from '../components/Ventas';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const VentasPage = () => {
    return (
        <>
            <div>
                <Nav />
            </div>

            <div className="container-sidebar">
                <Sidebar />
                <div className="content">
                    <Ventas />

                </div>
            </div>

            <div>
                <Footer />
            </div>
        </>

    );
};

export default VentasPage;
