import cls from "./InputPassword.module.scss";

import React from "react";

interface IErrors {
  password?: string;
  email?: string;
}

interface IProps {
  errors: IErrors;
  text: string;
  setText: (value: string) => void;
}

export const InputPassword = ({ errors, text, setText }: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={cls.inputWrap}>
      {errors.password && <div className={cls.error}>{errors.password}</div>}
      <input
        className={cls.input}
        type="password"
        placeholder="Пароль"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};
