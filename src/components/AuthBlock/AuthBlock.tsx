import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import cls from "./AuthBlock.module.scss";
import { login } from "../../api/authAPi";
import { useToastError } from "../../hooks/useToastError";
import { useAuthSuccess } from "../../hooks/useAuthSuccess";
import { BsSoundwave } from "react-icons/bs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { validate } from "./helpers/validate";

export const AuthBlock = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleRememberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
  };

  const handleError = useToastError();
  const handleSuccess = useAuthSuccess(remember);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      mutation.mutate({ username: email, password });
    }
  };

  return (
    <div className={cls.wrap}>
      <div className={cls.icon}>
        <BsSoundwave size={30} />
      </div>
      <h1 className={cls.title}>Добро пожаловать!</h1>
      <p className={cls.subtitle}>Пожалуйста, авторизируйтесь</p>

      <form className={cls.form} onSubmit={onSubmit}>
        <div className={cls.inputWrap}>
          {errors.email && <div className={cls.error}>{errors.email}</div>}
          <input
            className={cls.input}
            type="text"
            placeholder="Имя"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={cls.inputWrap}>
          {errors.password && (
            <div className={cls.error}>{errors.password}</div>
          )}
          <input
            className={cls.input}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={cls.checkbox}>
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                size="small"
                onChange={handleRememberChange}
                sx={{
                  color: "#e5e5e5",
                  "&.Mui-checked": { color: "blue" },
                }}
              />
            }
            label="Запомнить данные"
          />
        </div>

        <button className={cls.button} disabled={mutation.status === "pending"}>
          {mutation.status === "pending" ? "Вход..." : "Войти"}
        </button>
      </form>

      <div className={cls.divider}>или</div>

      <div className={cls.footer}>
        Нет аккаунта? <span>Создать</span>
      </div>
    </div>
  );
};
