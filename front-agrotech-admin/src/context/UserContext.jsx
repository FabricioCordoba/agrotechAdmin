import React, { createContext, useState, useEffect, Children } from "react";
import { user } from "../service/user";
import { FaDatabase } from "react-icons/fa6";

export const UserContext = createContext(user);

export const UserProvider = ({ children }) => {

  const urlUsers = 'http://localhost:3000/user'

  const [clients, setClients] = useState([])
  const [user, setUser] = useState("null");
  const [isLoggedIn, setIsloggenIn]= useState(false)
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsloggenIn(true);

    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); 
    
  };  

  const fetchClients = async (urlUsers) => {
      try {
          const response = await fetch(urlUsers);
          const data = await response.json();
          console.log("data",data);

        const clientsDb = data.filter(user=> user.rol=== "user" && user.active===true );

          setClients(clientsDb);
          console.log("data",clientsDb);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
      fetchClients(urlUsers);
  }, [])


  return (
    <UserContext.Provider value={{ user, clients, handleLogin, handleLogout,isLoggedIn, setIsloggenIn }}>
      {children}
    </UserContext.Provider>
  )
}