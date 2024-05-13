import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabla from "../components/Tabla.jsx"
import Nav from '../components/Nav.jsx';
import { ProductContext } from '../context/ProductContext.jsx';
import Footer from '../components/Footer.jsx';
import Sidebar from '../components/Sidebar.jsx';

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
            <Nav />
            <div className='container-sidebar'>
            <Sidebar/>

            <div className="container-card-category">
                 <Tabla  products={productsByCategory} />
            </div>
            </div>
            

            <Footer />
        </>


    );
}

export default Category;
