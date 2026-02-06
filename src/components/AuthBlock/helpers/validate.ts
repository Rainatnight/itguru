interface IErrors {
  email?: string;
  password?: string;
}

export const validate = (email: string, password: string): IErrors => {
  const newErrors: IErrors = {};

  if (!email) newErrors.email = "Поле имени обязательно";
  if (!password) newErrors.password = "Поле пароля обязательно";

  return newErrors;
};
