import React, { useState, type JSX } from "react";
import { MdLockOutline } from "react-icons/md";
import { FiMail, FiX, FiEye, FiEyeOff } from "react-icons/fi";
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

const leftIcons: Record<keyof IErrors, JSX.Element> = {
  username: <FiMail size={24} className={cls.icon} />,
  password: <MdLockOutline size={24} className={cls.icon} />,
};

const labels: Record<keyof IErrors, string> = {
  username: "Почта",
  password: "Пароль",
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
    if (name === "username" && value)
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
