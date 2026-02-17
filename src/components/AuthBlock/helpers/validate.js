export const validate = (email, password) => {
    const newErrors = {};
    if (!email)
        newErrors.username = "Поле имени обязательно";
    if (!password)
        newErrors.password = "Поле пароля обязательно";
    return newErrors;
};
