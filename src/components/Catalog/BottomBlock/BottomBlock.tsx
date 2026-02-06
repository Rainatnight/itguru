import { MdFilterList } from "react-icons/md";
import cls from "./BottomBlock.module.scss";
import { AiOutlineSync } from "react-icons/ai";
import { Products } from "./Products/Products";

export const BottomBlock = () => {
  return (
    <div className={cls.block}>
      <div className={cls.topRow}>
        <h2 className={cls.title}>Все позиции</h2>

        <div className={cls.actions}>
          <div className={cls.iconWrap}>
            <AiOutlineSync size={20} />
          </div>
          <div className={cls.iconWrap}>
            <MdFilterList size={20} />
          </div>

          <button className={cls.addButton}>Добавить</button>
        </div>
      </div>

      <Products />
    </div>
  );
};
