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

import { InputField } from "../InputField/InputField";

export const AuthBlock = () => {
  const [username, setUsername] = useState("");
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

    const validationErrors = validate(username, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      mutation.mutate({ username, password });
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
        <InputField
          errors={errors}
          setErrors={setErrors}
          name="username"
          value={username}
          setValue={setUsername}
          placeholder="Имя"
          type="text"
        />

        <InputField
          setErrors={setErrors}
          errors={errors}
          name="password"
          value={password}
          setValue={setPassword}
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
