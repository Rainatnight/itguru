import cls from "./InputText.module.scss";

export interface IErrors {
  password?: string;
  email?: string;
}

export interface IProps {
  errors: IErrors;
  text: string;
  setText: (value: string) => void;
}

export const InputText = ({ errors, text, setText }: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={cls.inputWrap}>
      {errors.email && <div className={cls.error}>{errors.email}</div>}
      <input
        className={cls.input}
        type="text"
        placeholder="Имя"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};
