import cls from "./BottomBlock.module.scss";
import { FiSettings, FiUser } from "react-icons/fi";

export const BottomBlock = () => {
  return (
    <div className={cls.block}>
      <div className={cls.topRow}>
        <span>Все позиции</span>
        <div className={cls.actions}>
          <FiSettings size={20} />
          <FiUser size={20} />
          <button className={cls.addButton}>Добавить</button>
        </div>
      </div>

      {/* Здесь будут позиции каталога */}
      <div className={cls.items}>{/* Пока пусто */}</div>
    </div>
  );
};
