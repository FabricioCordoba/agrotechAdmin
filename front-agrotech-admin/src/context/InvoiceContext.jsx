import React, { createContext, useState, useEffect, useContext } from 'react';
import {invoice} from "../service/invoice"

export const InvoicesContext= createContext(invoice);

export const InvoicesProvider = ({children})=>{
    const [invoices, setInvoices]= useState([]);

    const urlInvoices= 'http://localhost:3000/invoices';

    const fetchInvoices = async (urlInvoices) => {
        try {
            const response = await fetch(urlInvoices);
            const data = await response.json();
            setInvoices(data);
            console.log("data",data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInvoices(urlInvoices);
    }, []);
  

    return (
        <InvoicesContext.Provider value={{invoices}}>
            {children}
        </InvoicesContext.Provider >
    )
}

