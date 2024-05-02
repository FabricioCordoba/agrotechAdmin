const urlProducts = 'http://localhost:3001/product'


const controller = new AbortController();

export const getAllInvtry = async (urlProducts) => {
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

export const getAllInvtryById = async (id) => {
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

export const addInvtry = async (product) => {
    try {
        const res = await fetch(urlProducts, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invtry)
        });
        if (!res.ok) throw new Error(`Response not OK`)
        const parsed = res.json()
        return parsed;
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteInvtry = async (invtry) => {
    try {
        const res = await fetch(`${urlProducts}${invtry.id}`, {
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

export const updateInvtryById = async (id, updatedProduct) => {
    try {
        const res = await fetch(`${urlProducts}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        console.log("PRODUCTO NUEVO", updatedProduct);
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


