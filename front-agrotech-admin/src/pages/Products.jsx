import React, { useContext } from 'react';
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import Tabla from "../components/Tabla";
import Footer from "../components/Footer";
import { ProductContext } from "../context/ProductContext";
import "../styles/products.css";

function Products() {
    const { products } = useContext(ProductContext);

    return (
        <>
            <div className='nav'>
                <Nav />
            </div>
            <div className="container">
                <div className='container-sidebar'>
                    <Sidebar />
                </div>
                <div className="content">
                    <Tabla products={products} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Products;
