import { FaGlobe } from "react-icons/fa";
import cls from "./TopBlock.module.scss";
import { FiBell, FiMail, FiSliders } from "react-icons/fi";

export const TopBlock = () => {
  return (
    <div className={cls.block}>
      <h2 className={cls.title}>Товары</h2>
      <div className={cls.inputWrap}>
        <input
          className={cls.input}
          type="text"
          placeholder="Поиск товаров..."
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
