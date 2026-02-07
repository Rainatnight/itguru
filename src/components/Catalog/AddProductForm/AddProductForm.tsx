import { useState } from "react";
import { InputField, type IErrors } from "../../InputField/InputField";
import cls from "./AddProductForm.module.scss";

type Props = {
  onSuccess?: () => void;
};

export const AddProductForm = ({ onSuccess }: Props) => {
  const [values, setValues] = useState({
    name: "",
    price: "",
    vendor: "",
    article: "",
  });

  const [errors, setErrors] = useState<IErrors>({});

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const nextErrors: IErrors = {};
    if (!values.name) nextErrors.name = "Обязательное поле";
    if (!values.price) nextErrors.price = "Обязательное поле";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSuccess?.();
  };

  return (
    <form
      className={cls.form}
      onSubmit={(e) => {
        submit(e);
      }}
    >
      <h3 className={cls.title}>Добавить позицию</h3>

      <InputField
        name="name"
        value={values.name}
        setValue={(v) => setValues((p) => ({ ...p, name: v }))}
        errors={errors}
        setErrors={setErrors}
        placeholder="Введите наименование"
      />

      <InputField
        name="price"
        value={values.price}
        setValue={(v) => setValues((p) => ({ ...p, price: v }))}
        errors={errors}
        setErrors={setErrors}
        placeholder="Введите цену"
      />

      <InputField
        name="vendor"
        value={values.vendor}
        setValue={(v) => setValues((p) => ({ ...p, vendor: v }))}
        errors={errors}
        setErrors={setErrors}
        placeholder="Введите вендора"
      />

      <InputField
        name="article"
        value={values.article}
        setValue={(v) => setValues((p) => ({ ...p, article: v }))}
        errors={errors}
        setErrors={setErrors}
        placeholder="Введите артикул"
      />

      <div className={cls.actions}>
        <button type="submit">Сохранить</button>
      </div>
    </form>
  );
};
