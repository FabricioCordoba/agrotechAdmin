import React, { createContext, useState, useEffect, Children } from "react";

export const ProductContext = createContext(product);

export const ProductProvider = ({ children }) => {

    const urlProducts = 'http://localhost:3001/product'
    const [products, setProducts] = useState([]);
    
    const fetchProducts = async (urlProducts) => {
        try {
            const response = await fetch(urlProducts);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts(urlProducts);
    }, []);

    return (
        <ProductProvider value={{products}}>
            {children}
        </ProductProvider>
    )
}