import cls from "./TopBlock.module.scss";
import { FiSearch, FiPlus, FiSettings, FiUser } from "react-icons/fi";

export const TopBlock = () => {
  return (
    <div className={cls.block}>
      <h2 className={cls.title}>Товары</h2>
      <input className={cls.input} type="text" placeholder="Поиск товаров..." />
      <div className={cls.divider}></div>
      <div className={cls.icons}>
        <FiSearch size={24} />
        <FiSettings size={24} />
        <FiUser size={24} />
        <FiPlus size={24} />
      </div>
    </div>
  );
};
