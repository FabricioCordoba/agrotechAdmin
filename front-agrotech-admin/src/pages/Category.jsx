import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabla from "../components/Tabla.jsx"
import Nav from '../components/Nav.jsx';
import { ProductContext } from '../context/ProductContext.jsx';
import Footer from '../components/Footer.jsx';
import Sidebar from '../components/Sidebar.jsx';
import "../styles/category.css";


function Category() {

    const { category } = useParams(); // Obtener el parámetro de la URL
    const { products } = useContext(ProductContext);

    const [productsByCategory, setProductsByCategory] = useState([]);

    useEffect(() => {
        // Filtrar los productos por la categoría actual

        const filteredProducts = products.filter(product => product.category === category);

        setProductsByCategory(filteredProducts);
    }, [products, category]);

    return (
        <>
            <div className='container-general-category'>

                <div className='nav-category'>
                    <Nav />
                </div>
                <div className="container-category-sidebar">
                    <div className='container-sidebar'>
                        <Sidebar />
                    </div>
                    <div className="content-category">
                        <Tabla products={productsByCategory} />
                    </div>
                </div>
                <Footer />
            </div>

        </>

    );
}

export default Category;
