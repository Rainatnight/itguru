import { useState } from "react";
import type { AuthResponse } from "./types";
import { useNavigate } from "react-router-dom";
import cls from "./AuthBlock.module.scss";

export const AuthBlock = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Неверная почта или пароль");
      }

      const data: AuthResponse = await res.json();
      console.log("USER:", data);

      if (remember) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      navigate("/catalog", { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <div className={cls.wrap}>
      <h1 className={cls.title}>Добро пожаловать!</h1>
      <p className={cls.subtitle}>Пожалуйста, авторизуйтесь</p>

      <form className={cls.form} onSubmit={onSubmit}>
        <input
          className={cls.input}
          type="text"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={cls.input}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className={cls.checkbox}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Запомнить данные
        </label>

        {error && <div className={cls.error}>{error}</div>}

        <button className={cls.button} disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>

      <div className={cls.divider}>или</div>

      <div className={cls.footer}>
        Нет аккаунта? <span>Создать</span>
      </div>
    </div>
  );
};
