import React, { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { FiEye, FiEyeOff, FiMail, FiX } from "react-icons/fi";
import cls from "./InputField.module.scss";

export interface IErrors {
  password?: string;
  username?: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const clearInput = () => setValue("");

  const renderLeftIcon = () => {
    if (name === "username") return <FiMail size={24} className={cls.icon} />;
    if (name === "password")
      return <MdLockOutline size={24} className={cls.icon} />;
    return null;
  };

  const renderRightIcon = () => {
    if (name === "username" && value)
      return <FiX size={20} className={cls.rightIcon} onClick={clearInput} />;
    if (name === "password")
      return (
        <>
          {showPassword ? (
            <FiEyeOff
              size={20}
              className={cls.rightIcon}
              onClick={togglePassword}
            />
          ) : (
            <FiEye
              size={20}
              className={cls.rightIcon}
              onClick={togglePassword}
            />
          )}
        </>
      );
    return null;
  };

  const getLabel = () => {
    if (name === "username") return "Почта";
    if (name === "password") return "Пароль";
    return "";
  };

  return (
    <div className={cls.inputWrap}>
      <div className={cls.labelErrorRow}>
        <span className={cls.label}>{getLabel()}</span>
        <span className={cls.error}>{errors?.[name] || "\u00A0"}</span>
      </div>
      <div className={cls.inputInner}>
        {renderLeftIcon()}
        <input
          className={cls.input}
          type={name === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {renderRightIcon()}
      </div>
    </div>
  );
};
