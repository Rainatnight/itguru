import { useEffect } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Pagination } from "../../../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store";

import { fetchProducts } from "../../../../store/thunks/productsThunks";
import { setCurrentPage } from "../../../../store/slices/productsSlice";
import cls from "./Products.module.scss";

const itemsPerPage = 5;

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: products,
    total: totalProducts,
    loading,
    currentPage,
  } = useSelector((state: RootState) => state.products);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  useEffect(() => {
    dispatch(fetchProducts()).unwrap().catch(console.error);
  }, [currentPage, dispatch]);

  // массив для скелетонов
  const skeletons = Array.from({ length: itemsPerPage });

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <div className={cls.cellTitle}>Наименование</div>
        <div className={cls.cell}>Вендор</div>
        <div className={cls.cell}>Артикул</div>
        <div className={cls.cell}>Оценка</div>
        <div className={cls.cell}>Цена, ₽</div>
        <div className={cls.cell}>Количество</div>
        <div className={`${cls.cell} ${cls.actions}`}>Действия</div>
      </div>

      {loading ? (
        skeletons.map((_, index) => (
          <div key={index} className={`${cls.row} ${cls.skeletonRow}`}></div>
        ))
      ) : products.length ? (
        products.map((product) => (
          <div key={product.id} className={cls.row}>
            <div className={cls.cellTitle}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={cls.imagePlaceholder}></div>
                <div className={cls.textWrapper}>
                  <div className={cls.titleText}>{product.title}</div>
                  <div className={cls.categoryText}>{product.category}</div>
                </div>
              </div>
            </div>
            <div className={cls.cell}>
              <span className={cls.placeholder}>{product.brand || "-"}</span>
            </div>
            <div className={cls.cell}>{product.id}</div>
            <div className={cls.cell}>
              <span style={{ color: product.rating < 3 ? "red" : "inherit" }}>
                {Math.floor(product.rating)}
              </span>
              <span>/5</span>
            </div>
            <div className={cls.cell}>
              {Math.floor(product.price).toLocaleString("ru-RU")}
              <span className={cls.cents}>,00 ₽</span>
            </div>
            <div className={cls.cell}>{product.stock}</div>
            <div className={`${cls.cell} ${cls.actions}`}>
              <button className={cls.addButton}>+</button>
              <PiDotsThreeCircle size={30} />
            </div>
          </div>
        ))
      ) : (
        <div className={cls.notFound}>Не найдено</div>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      />
    </div>
  );
};
