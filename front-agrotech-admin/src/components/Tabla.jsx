import { useContext, useState, useRef } from 'react'
import { deleteProduct, updateProductById } from '../service/productService';
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { ProductContext } from '../context/ProductContext';
import { product } from '../service/product';
import { useNavigate } from 'react-router-dom';
// import "../styles/tabla.css"

function Tabla() {
    const navigate = useNavigate();
    
    const modalDeleteRef = useRef(null);
    const { products } = useContext(ProductContext);
    console.log("tabla", products);
    const [productUpdate, setProductUpdate] = useState({
        idProduct: product.idProduct,
        codeProduct: product.codeProduct,
        product: product.product,
        description: product.description,
        price: product.price,
        category: product.category,
        amount: product.amount,
        images: product.images
    });

    function handleChange(e) {
        e.preventDefault();
        setProductUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }))
        return productUpdate
    };

    const handleSaveClick = async () => {
        console.log("idEditar", productUpdate.idProduct);
        const updatedProductResponse = await updateProductById(productUpdate.idProduct, productUpdate);
        return updatedProductResponse
    };


    const handleEditClick = (producto) => {
        setProductUpdate(producto);
        modalEdit.showModal()
    };
   
//     const handleDeleteClick = (product) => {
//         setProductUpdate(product)
//         modalDelete.showModal()
//     }
// const cancelModal =()=>{
//    modalDelete.Moda
// }

const handleDeleteClick = (product) => {
    setProductUpdate(product)
    modalDeleteRef.current.showModal();
}

const cancelModal = () => {
    modalDeleteRef.current.close(); // Cerrar el modal utilizando la referencia
}

const confirmDelete = () => {
    deleteProduct(productUpdate);
    modalDeleteRef.current.close(); // Cerrar el modal después de eliminar el producto
}

    return (
        <section className='layout'>
            <div className="table-container">
                <h1>Lista de Productos</h1>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Productos</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th>Cantidad disponible</th>
                            <th>Imagen</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.idProduct}>
                                <td>{product.codeProduct}</td>
                                <td>{product.product}</td>
                                <td>{product.description}</td>
                                <td>${(product.price)}</td>
                                <td>{product.category}</td>
                                <td>{product.amount}</td>
                                <td><img src={product.images} alt={product.product} width="50" /></td>
                                <td>
                                    <button className='button-edit' onClick={() => handleEditClick(product)}><AiFillEdit /></button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteClick(product)}><AiFillDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {productUpdate && (
                <div className='edit-form'>
                    <dialog id="modalEdit">
                        <h2>Editar Producto</h2>
                        <form action="" method="dialog" id="form" >
                            <input
                                type="text"
                                name="codeProduct"
                                value={productUpdate.codeProduct}
                                onChange={handleChange}

                            />
                            <input
                                type="text"
                                name="product"
                                value={productUpdate.product}
                                onChange={handleChange}

                            />
                            <input
                                type="text"
                                name="description"
                                value={productUpdate.description}
                                onChange={handleChange}

                            />
                            <input
                                type="number"
                                name="price"
                                value={productUpdate.price}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="category"
                                value={productUpdate.category}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="amount"
                                value={productUpdate.amount}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                value={productUpdate.images}
                                onChange={handleChange}
                            />
                            <button onClick={handleSaveClick}>Guardar</button>
                            <button >Cancelar</button>
                        </form>
                    </dialog>
                </div>
            )}

            {productUpdate && (
                <dialog ref={modalDeleteRef} id='modalDelete'>
                    <p>¿Desea eliminar el producto? {productUpdate.product}</p>
                    <button onClick={confirmDelete}>Aceptar</button>
                    <button onClick={ cancelModal}>Cancelar</button>
                </dialog>

            )
            }
        </section>
    );
}

export default Tabla;