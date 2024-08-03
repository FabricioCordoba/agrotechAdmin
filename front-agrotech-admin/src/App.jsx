
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Category from "./pages/Category";
import Products from "./pages/Products";
import Clients from "./pages/Clients";
import CustomerPurchases from "./pages/CustomerPurchases";
import VentasPage from "./pages/VentasPage";
import { RutasProtegidas } from "./components/RutasProtegidas";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import React from "react";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<RutasProtegidas isAllowed={isLoggedIn} redirectPath="/" />}>
        <Route path="products" element={<Products />} />
        <Route path="register" element={<Register />} />
        <Route path="products/:category" element={<Category />} />
        <Route path="/Clients" element={<Clients />} />
        <Route path="/customer-purchases/:id" element={<CustomerPurchases />} />
        <Route path="/ventas" element={<VentasPage />} />
      </Route>
    </Routes>
  );
}

export default App;
