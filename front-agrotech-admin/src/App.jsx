

import "./App.css"
import { Routes, Route, Router } from "react-router-dom"
import Home from "./pages/Products"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Category from "./pages/Category"
import Products from "./pages/Products"
import Clients from "./pages/Clients"



function App() {


  return (
    <>
      <Routes>

        <Route path="products" element={<Products />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="products/:category" element={<Category/>} />
        <Route path="/Clients" element={<Clients/>}/>

      </Routes>


    </>
  )
}

export default App
