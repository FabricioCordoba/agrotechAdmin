import Nav from "../components/Nav";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import Tabla from "../components/Tabla";
import Sidebar from "../components/Sidebar";
import "../styles/products.css"
import { ProductContext } from "../context/ProductContext";


function Products() {
  
const {products}= useContext(ProductContext)
  return (
    <>
      <div>
        <Nav />
      </div>

      <div className="container-sidebar">
        <Sidebar/>
        <div className="content">
        <Tabla products={products}/>
        </div>
      </div>
     
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Products;