export const url_users = 'http://localhost:3000/invoices/user/'

const controller = new AbortController();

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
