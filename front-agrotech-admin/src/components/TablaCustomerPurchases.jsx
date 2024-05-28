import React, { useEffect, useState } from 'react';

const TablaCustomerPurchases = ({ idUser }) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch(`http://localhost:3000/invoices/user/${idUser}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch invoices');
                }
                const data = await response.json();
                setInvoices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (idUser) {
            fetchInvoices();
        }
    }, [idUser]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Aun no registra compras</p>;

    return (
        <div>
            <h1>Historial de Compras</h1>
            {invoices.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Fecha de Factura</th>
                            <th>Total Sin IVA</th>
                            <th>Total Con IVA</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.idInvoice}>
                                <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                                <td>{invoice.total_without_iva}</td>
                                <td>{invoice.total_with_iva}</td>
                                <td>
                                    <ul>
                                        {invoice.invoiceDetails.map((detail) => (
                                            <li key={detail.id}>
                                                Producto: {detail.product.product} - 
                                                Descripción: {detail.product.description} - 
                                                Precio: {detail.product.price} - 
                                                Cantidad: {detail.amount_sold}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay compras registradas.</p>
            )}
        </div>
    );
};

export default TablaCustomerPurchases;
