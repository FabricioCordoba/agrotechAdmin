import React, { createContext, useState, useEffect } from "react";
import { user as userDefault } from "../service/user";

export const UserContext = createContext(userDefault);

export const UserProvider = ({ children }) => {
  const urlUsers = 'http://localhost:3000/user';

  const [clients, setClients] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return storedIsLoggedIn === 'true';
  });

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedUser && storedIsLoggedIn === 'true') {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  };

  const fetchClients = async () => {
    try {
      const response = await fetch(urlUsers);
      const data = await response.json();
      const clientsDb = data.filter(user => user.rol === "user" && user.active === true);
      setClients(clientsDb);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <UserContext.Provider value={{ user, clients, handleLogin, handleLogout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
