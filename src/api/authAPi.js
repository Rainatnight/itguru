export const login = async ({ username, password, }) => {
    const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
        throw new Error("Неверное имя или пароль");
    }
    return res.json();
};
