import { useState, useEffect, useCallback } from "react";
import { FaGlobe } from "react-icons/fa";
import { FiBell, FiMail, FiSliders } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../store/thunks/productsThunks";
import type { AppDispatch } from "../../../store";
import { setCurrentPage, setSearch } from "../../../store/slices/productsSlice";
import cls from "./TopBlock.module.scss";

export const TopBlock = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState("");
  const debounceTime = 500;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  // Дебаунс
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setCurrentPage(1));
      dispatch(setSearch(inputValue));
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [inputValue, dispatch]);

  return (
    <div className={cls.block}>
      <h2 className={cls.title}>Товары</h2>

      <div className={cls.inputWrap}>
        <input
          className={cls.input}
          type="text"
          placeholder="Поиск товаров..."
          value={inputValue}
          onChange={handleChange}
        />
      </div>

      <div className={cls.right}>
        <div className={cls.divider}></div>
        <div className={cls.icons}>
          <FaGlobe size={24} />
          <FiBell size={24} />
          <FiMail size={24} />
          <FiSliders size={24} />
        </div>
      </div>
    </div>
  );
};
