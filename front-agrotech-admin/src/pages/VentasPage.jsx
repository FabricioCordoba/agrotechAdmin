import React from 'react';
import Ventas from '../components/Ventas';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import "../styles/ventasPage.css"
const VentasPage = () => {
    return (
        <>

        <div className='container-general-ventas'>
        <div>
                <Nav />
            </div>

            
            <div className="container-ventas-sidebar">
                <div className='container-sidebar'>
                    <Sidebar />
                </div>
                <div className="content">
                    <Ventas />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
           
        </>

    );
};

export default VentasPage;