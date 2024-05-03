
const urlProducts = 'http://localhost:3001/product'


const controller = new AbortController();

export const getProducts = async (urlProducts) => {
    try {
        const res = await fetch(urlProducts, {
            method: 'GET',
            headers: { 'Content-Type': "application/json" },
            signal: controller.signal
        });
        if (!res.ok) throw new Error("Response not ok");
        const products = await res.json();
        return products;
    } catch (err) {
        throw err;
    }
}

export const getProductById = async (id) => {
    try {
        const res = await fetch(`${urlProducts}${id}`, {
            method: "GET",
            headers: { 'Content-Type': "application/json" },
            signal: controller.signal
        });
        if (!res.ok) throw new Error("Response not ok");
        const product = await res.json();
        return product;
    } catch (err) {
        throw err;
    }
}

export const addProduct = async (product) => {
    try {
        const res = await fetch(urlProducts, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (!res.ok) throw new Error(`Response not OK`)
        const parsed = res.json()
        return parsed;
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteProduct = async (product) => {
    const productDelete= product;
    try {
        const res = await fetch(`${urlProducts}/${productDelete.idProduct}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(`Response not OK`)
        const product = await res.json();
        window.location.reload();
        return product
    } catch (err) {
        throw new Error(err);
    }
}


export const updateProductById = async (id, updatedProduct) => {
    try {
        // Crear un nuevo objeto con los campos deseados
        const dataToSend = {
            amount: Number(updatedProduct.amount),
            category: updatedProduct.category,
            codeProduct: updatedProduct.codeProduct,
            description: updatedProduct.description,
            images: updatedProduct.images,
            product: updatedProduct.product,
            price: updatedProduct.price
        };

        const res = await fetch(`${urlProducts}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        console.log("PRODUCTO NUEVO", dataToSend);
        const product = await res.json();
        return product;
    } catch (err) {
        throw new Error(err);
    }
}


export const itemsInvtry = ['Tranquera', 'ropa trabajo', 'Ferretería'];

export const getInvtryByItem = async (category) => {
    const res = await fetch(urlProducts)
    const products = await res.json();
    const productsCategory = products.filter((product) => product.category === category)
    if (!productsCategory.length) throw new Error(`No hay ${category} en stock`)
    return productsCategory;
}


