import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const TablaCustomerPurchases = () => {
    const { user } = useContext(UserContext);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch(`http://localhost:3000/invoices/user/${user.idUser}`);
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

        if (user) {
            fetchInvoices();
        }
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


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
                                            <li key={detail.idInvoicesDetails}>
                                                {detail.id_product.product} - Cantidad: {detail.amount_sold}
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

export default TablaCustomerPurchases ;
