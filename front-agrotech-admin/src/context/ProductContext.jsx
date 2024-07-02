import React, { createContext, useState, useEffect, children } from "react";
import {product} from "../service/product"

export const ProductContext = createContext(product);

export const ProductProvider = ({ children }) => {

    const urlProducts = 'http://localhost:3000/product'
    const [products, setProducts] = useState([]);

    const fetchProducts = async (urlProducts) => {
        try {
            const response = await fetch(urlProducts);
            const data = await response.json();
            setProducts(data);
            console.log("data",data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts(urlProducts);
    }, []);

    return (
        <ProductContext.Provider value={{products}}>
            {children}
        </ProductContext.Provider>
    )
}