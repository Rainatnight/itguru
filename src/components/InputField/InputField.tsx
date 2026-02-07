import React, { useState, type JSX } from "react";
import { MdLockOutline } from "react-icons/md";
import cls from "./InputField.module.scss";
import {
  FiEdit,
  FiTag,
  FiTruck,
  FiHash,
  FiMail,
  FiEyeOff,
  FiX,
  FiEye,
} from "react-icons/fi";

export interface IErrors {
  password?: string;
  username?: string;
  name?: string;
  price?: string;
  vendor?: string;
  article?: string;
}

interface IProps {
  errors?: IErrors;
  setErrors: React.Dispatch<React.SetStateAction<IErrors>>;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password";
  name: keyof IErrors;
}

const leftIcons: Record<keyof IErrors, JSX.Element> = {
  username: <FiMail size={24} className={cls.icon} />,
  password: <MdLockOutline size={24} className={cls.icon} />,
  name: <FiEdit size={24} className={cls.icon} />,
  price: <FiTag size={24} className={cls.icon} />,
  vendor: <FiTruck size={24} className={cls.icon} />,
  article: <FiHash size={24} className={cls.icon} />,
};

const labels: Record<keyof IErrors, string> = {
  username: "Имя",
  password: "Пароль",
  name: "Наименование",
  price: "Цена",
  vendor: "Вендор",
  article: "Артикул",
};

export const InputField = ({
  errors,
  setErrors,
  value,
  setValue,
  placeholder,
  type = "text",
  name,
}: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [name, setValue, setErrors],
  );

  const togglePassword = React.useCallback(
    () => setShowPassword((prev) => !prev),
    [],
  );
  const clearInput = React.useCallback(() => setValue(""), [setValue]);

  const inputType = name === "password" && showPassword ? "text" : type;

  const RightIconMemo = React.useMemo(() => {
    if (name !== "password" && value)
      return <FiX size={20} className={cls.rightIcon} onClick={clearInput} />;

    if (name === "password")
      return showPassword ? (
        <FiEyeOff
          size={20}
          className={cls.rightIcon}
          onClick={togglePassword}
        />
      ) : (
        <FiEye size={20} className={cls.rightIcon} onClick={togglePassword} />
      );

    return null;
  }, [name, value, showPassword]);

  return (
    <div className={cls.inputWrap}>
      <div className={cls.labelErrorRow}>
        <span className={cls.label}>{labels[name]}</span>
        <span className={cls.error}>{errors?.[name] || "\u00A0"}</span>
      </div>

      <div className={cls.inputInner}>
        {leftIcons[name]}
        <input
          className={cls.input}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {RightIconMemo}
      </div>
    </div>
  );
};
