import { useContext, useState } from 'react'

import { deleteProduct, updateProductById } from '../service/productService';

import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import  {ProductContext}  from '../context/ProductContext';
import { product } from '../service/product';


function Tabla() {

    const { products } = useContext(ProductContext);
    console.log("tabla", products); 
    const [productUpdate, setProductUpdate] = useState({
        idProduct: product.idProduct,
        
        codeProduct: product.codeProduct,
        product: product.product ,
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
      }
//       // Manejador de envío del formulario
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Lógica para enviar los datos actualizados al backend
//     // Por ejemplo, podrías llamar a una función updateUser con los datos formData
//     updateProductById(product.idProduct, productUpdate);
// console.log("editado", productUpdate);

//     console.log("id", product.idProduct);
//     window.location.reload()
    
//   };

const handleSaveClick = async () => {
    console.log("idEditar" ,productUpdate.idProduct);
   
            const updatedProductResponse = await updateProductById(productUpdate.idProduct, productUpdate);
             
            return updatedProductResponse
       
};


  const handleEditClick = (producto) => {
    setProductUpdate(producto);
    modal.showModal()
};

// const handleDeleteProfile = () => {
//     console.log(productUpdate);
//     deleteProduct(productUpdate);
//      // Eliminar sesión del usuario
//      window.location.reload()
  
//   };
  
        
      
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
                                        <button onClick={()=>deleteProduct(product)}><AiFillDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {productUpdate && (
                    <div className='edit-form'>
                        <dialog id="modal">
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
            </section>
    );
}

export default Tabla;