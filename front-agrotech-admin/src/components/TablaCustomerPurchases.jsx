import React, { useEffect, useState } from 'react';
import "../styles/tablaCustomerPurchases.css";

const TablaCustomerPurchases = ({ idUser }) => {
    const [invoices, setInvoices] = useState([]);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const invoicesPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [invoicesResponse, clientResponse] = await Promise.all([
                    fetch(`http://localhost:3000/invoices/user/${idUser}`).then(response => response.json()),
                    fetch(`http://localhost:3000/user/${idUser}`).then(response => response.json())
                ]);

                // Asegurarse de que invoicesResponse sea un arreglo
                setInvoices(Array.isArray(invoicesResponse) ? invoicesResponse : []);
                setClient(clientResponse);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (idUser) {
            fetchData();
        }
    }, [idUser]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const totalPages = Math.ceil(invoices.length / invoicesPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const paginatedInvoices = invoices.slice((currentPage - 1) * invoicesPerPage, currentPage * invoicesPerPage);

    return (
        <div className='general-tabla-historialCompra'>
            {client && (
                <>
                    {invoices.length > 0 ? (
                        <>
                            <h1>Historial de Compras de {client.name} {client.lastname}</h1>

                            <table className='tabla-historial'>
                                <thead>
                                    <tr>
                                        <th>Fecha de Factura</th>
                                        <th>Total Sin IVA</th>
                                        <th>Total Con IVA</th>
                                        <th>Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedInvoices.map((invoice) => (
                                        <tr key={invoice.idInvoice}>
                                            <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                                            <td>${invoice.total_without_iva}</td>
                                            <td>${invoice.total_with_iva}</td>
                                            <td>
                                                <ul>
                                                    {invoice.invoiceDetails.map((detail) => (
                                                        <li key={detail.id}>
                                                            Producto: {detail.product.product} -
                                                            Descripción: {detail.product.description} -
                                                            Precio: ${detail.product.price} -
                                                            Cantidad: {detail.amount_sold}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="pagination">
                                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                                <span>{currentPage} de {totalPages}</span>
                                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
                            </div>
                        </>
                    ) : (
                        <div className='no-hay-compras'>
                            <h1>Historial de Compras de {client.name} {client.lastname}</h1>
                            <p >No hay compras registradas.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TablaCustomerPurchases;
