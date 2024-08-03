import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import Tabla from '../components/Tabla';
import Footer from '../components/Footer';
import { ProductContext } from '../context/ProductContext';
import "../styles/products.css";

function ProductList() {
    const { category } = useParams(); // Obtener el parámetro de la URL
    const { products } = useContext(ProductContext);

    const [displayedProducts, setDisplayedProducts] = useState([]);

    useEffect(() => {
        // Filtrar los productos por la categoría si existe, de lo contrario, mostrar todos los productos
        if (category) {
            const filteredProducts = products.filter(product => product.category === category);
            setDisplayedProducts(filteredProducts);
        } else {
            setDisplayedProducts(products);
        }
    }, [products, category]);

    return (
        <div className='container-general-product-list'>
            <div className='nav'>
                <Nav />
            </div>
            <div className="container-product-list-sidebar">
                <div className='container-sidebar'>
                    <Sidebar />
                </div>
                <div className="content">
                    <Tabla products={displayedProducts} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductList;
