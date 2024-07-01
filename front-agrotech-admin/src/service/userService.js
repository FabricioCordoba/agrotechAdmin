

export const url_users = 'http://localhost:3000/user'

const controller = new AbortController();

export const getUsers = async (url_users) => {
    try {
        const res = await fetch(url_users, {
            method: 'GET',
            headers: { 'Content-Type': "application/json" },
            signal: controller.signal
        });
        if (!res.ok) throw new Error("Response not ok");
        const parsed = await res.json();
        return parsed;
    } catch (err) {
        throw err;
    }
}

export const getUserById = async (id) => {
    try {
        const res = await fetch(`${url_users}${id}`, {
            method: "GET",
            headers: { 'Content-Type': "application/json" },
            signal: controller.signal
        });
        if (!res.ok) throw new Error("Response not ok");
        const parsed = await res.json();
        return parsed;
    } catch (err) {
        throw err;
    }
}

export const addUser = async (user) => {
    try {
        const res = await fetch(url_users, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        console.log("usuario", user);


        if (!res.ok) throw new Error(`Response not OK`)
        const parsed = res.json()
        console.log("user",user);

        return parsed;
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteUser = async (user) => {
    console.log(user);
    try {
        const res = await fetch(`${url_users}/${user.idUser}`, {
            method: 'DELETE',
             headers: {'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(`Response not OK`)
        const parsed = await res.json();
        window.location.reload();
        console.log(parsed);
           
    return parsed
    } catch (err) {
        throw new Error(err);
    }
}

export const updateUserById = async (id, updatedUser) => {
 

    try {
        const dataToSend = {      
            name: updatedUser.name,
            lastname: updatedUser.lastname,
            phone: updatedUser.phone,
            email: updatedUser.email,
            address: updatedUser.address 
        
        };
        const res = await fetch(`${url_users}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        console.log("USUARIO NUEVO", dataToSend);
        const parsed = await res.json();
       
        return parsed;
    } catch (err) {
        throw new Error(err);
    }
}




