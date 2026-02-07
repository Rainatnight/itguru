import { MdFilterList } from "react-icons/md";
import { AiOutlineSync } from "react-icons/ai";
import { Products } from "./Products/Products";
import { useCallback, useState } from "react";
import { Modal } from "../../Modal/Modal";
import { AddProductForm } from "../AddProductForm/AddProductForm";
import { addToast } from "../../../store/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/thunks/productsThunks";
import {
  setCurrentPage,
  setSortOrder,
} from "../../../store/slices/productsSlice";
import type { AppDispatch, RootState } from "../../../store";
import cls from "./BottomBlock.module.scss";

export const BottomBlock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  const sortOrder = useSelector((state: RootState) => state.products.sortOrder);

  const dispatch = useDispatch<AppDispatch>();

  const close = useCallback(() => setIsOpen(false), []);

  const onSuccess = useCallback(() => {
    setIsOpen(false);
    dispatch(addToast({ message: "Успешно", type: "success", duration: 4000 }));
  }, [dispatch]);

  const applySort = useCallback(
    (order: "asc" | "desc" | null, e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(setSortOrder(order));
      setSortMenu(false);
      dispatch(setCurrentPage(1));
      dispatch(fetchProducts());
    },
    [dispatch],
  );

  const toggleSortMenu = useCallback(() => setSortMenu((prev) => !prev), []);

  const refresh = useCallback(() => {
    setSortMenu(false);
    dispatch(setSortOrder(null));
    dispatch(setCurrentPage(1));
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={cls.block}>
      <div className={cls.topRow}>
        <h2 className={cls.title}>Все позиции</h2>

        <div className={cls.actions}>
          <div className={cls.iconWrap}>
            <AiOutlineSync size={20} onClick={refresh} />
          </div>
          <div className={cls.iconWrap} onClick={toggleSortMenu}>
            <MdFilterList size={20} color={sortOrder ? "blue" : "grey"} />
            {sortMenu && (
              <div className={cls.sortMenu}>
                <div
                  onClick={(e) => applySort("asc", e)}
                  className={sortOrder === "asc" ? cls.activeOption : ""}
                >
                  Цена ↑
                </div>
                <div
                  onClick={(e) => applySort("desc", e)}
                  className={sortOrder === "desc" ? cls.activeOption : ""}
                >
                  Цена ↓
                </div>
                <div
                  onClick={(e) => applySort(null, e)}
                  className={sortOrder === null ? cls.activeOption : ""}
                >
                  Сброс
                </div>
              </div>
            )}
          </div>

          <button className={cls.addButton} onClick={() => setIsOpen(true)}>
            Добавить
          </button>
        </div>
      </div>

      {isOpen && (
        <Modal onClose={close}>
          <AddProductForm onSuccess={onSuccess} />
        </Modal>
      )}

      <Products />
    </div>
  );
};
