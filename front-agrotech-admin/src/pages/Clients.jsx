import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import "../styles/clients.css"
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import Footer from "../components/Footer"



import TablaUser from "../components/TablaUsers";

function Clients() {
    const { clients } = useContext(UserContext)
    console.log("clientes", clients);

    return (
        <>
            <div>
                <Nav />
            </div>
            <div className="container-sidebar">
                <Sidebar />
                <div>
                    <TablaUser clients={clients} />

                </div>
            </div>


            <div>
                <Footer />
            </div>
        </>

    )
}

export default Clients