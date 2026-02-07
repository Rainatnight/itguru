import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import cls from "./AuthBlock.module.scss";
import { login, type AuthResponse } from "../../api/authAPi";
import { useToastError } from "../../hooks/useToastError";
import { useAuthSuccess } from "../../hooks/useAuthSuccess";
import { BsSoundwave } from "react-icons/bs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { validate } from "./helpers/validate";
import { InputField } from "../InputField/InputField";
import { Link } from "react-router-dom";

type FormData = {
  username: string;
  password: string;
};

export const AuthBlock = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = useCallback((name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleRememberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setRemember(event.target.checked),
    [],
  );

  const handleError = useToastError();
  const handleSuccess = useAuthSuccess(remember);

  const mutation = useMutation<AuthResponse, Error, FormData>({
    mutationFn: login,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const isSubmitting = mutation.status === "pending";

  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const validationErrors = validate(formData.username, formData.password);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        mutation.mutate(formData);
      }
    },
    [formData, mutation],
  );

  return (
    <div className={cls.wrap}>
      <div className={cls.icon}>
        <BsSoundwave size={30} />
      </div>

      <h1 className={cls.title}>Добро пожаловать!</h1>
      <p className={cls.subtitle}>Пожалуйста, авторизируйтесь</p>

      <form className={cls.form} onSubmit={onSubmit}>
        <InputField
          name="username"
          value={formData.username}
          setValue={(v) => handleChange("username", v)}
          errors={errors}
          setErrors={setErrors}
          placeholder="Имя"
          type="text"
        />

        <InputField
          name="password"
          value={formData.password}
          setValue={(v) => handleChange("password", v)}
          errors={errors}
          setErrors={setErrors}
          placeholder="Пароль"
          type="password"
        />

        <div className={cls.checkbox}>
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                size="small"
                onChange={handleRememberChange}
                sx={{
                  color: "#999",
                  "&.Mui-checked": { color: "blue" },
                }}
              />
            }
            label="Запомнить данные"
          />
        </div>

        <button className={cls.button} disabled={isSubmitting}>
          {isSubmitting ? "Вход..." : "Войти"}
        </button>
      </form>

      <div className={cls.divider}>или</div>

      <div className={cls.footer}>
        Нет аккаунта? <Link to="/signup">Создать</Link>
      </div>
    </div>
  );
};
