import Nav from "../components/Nav";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";

import React, { useContext, useEffect, useState } from 'react';
import Tabla from "../components/Tabla";

function Home() {
  

  return (
    <>
      <div>
        <Nav />
      </div>

      <div>
        <Tabla/>
      </div>

     
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;