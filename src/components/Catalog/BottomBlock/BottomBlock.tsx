import { MdFilterList } from "react-icons/md";
import { AiOutlineSync } from "react-icons/ai";
import { Products } from "./Products/Products";
import { useState } from "react";
import { Modal } from "../../Modal/Modal";
import { AddProductForm } from "../AddProductForm/AddProductForm";
import cls from "./BottomBlock.module.scss";

export const BottomBlock = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

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

          <button className={cls.addButton} onClick={() => setIsOpen(true)}>
            Добавить
          </button>
        </div>
      </div>

      {isOpen && (
        <Modal onClose={close}>
          <AddProductForm onSuccess={() => setIsOpen(false)} />
        </Modal>
      )}

      <Products />
    </div>
  );
};
