import { useCallback, useEffect, useMemo, useState } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Pagination } from "../../../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store";

import { fetchProducts } from "../../../../store/thunks/productsThunks";
import { setCurrentPage } from "../../../../store/slices/productsSlice";
import cls from "./Products.module.scss";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const itemsPerPage = 5;

export const Products = () => {
  const [chosenElements, setChosenElements] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: products,
    total: totalProducts,
    loading,
    currentPage,
    search,
    sortOrder,
  } = useSelector((state: RootState) => state.products);

  const handlePageChange = useCallback(
    (page: number) => dispatch(setCurrentPage(page)),
    [dispatch],
  );

  const toggleChosenElement = useCallback((id: string) => {
    setChosenElements((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id],
    );
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(totalProducts / itemsPerPage),
    [totalProducts],
  );

  const skeletons = useMemo(() => Array.from({ length: itemsPerPage }), []);

  useEffect(() => {
    dispatch(fetchProducts()).unwrap().catch(console.error);
  }, [currentPage, dispatch, search, sortOrder]);

  return (
    <div className={cls.container}>
      <div className={cls.tableWrapper}>
        <div className={cls.header}>
          <div></div>
          <div>Наименование</div>
          <div>Вендор</div>
          <div>Артикул</div>
          <div>Оценка</div>
          <div>Цена, ₽</div>
          <div>Количество</div>
          <div>Действия</div>
        </div>

        {loading ? (
          skeletons.map((_, index) => (
            <div key={index} className={`${cls.row} ${cls.skeletonRow}`}></div>
          ))
        ) : products.length ? (
          products.map((product) => (
            <div
              key={product.id}
              className={`${cls.row} ${
                chosenElements.includes(String(product.id)) ? cls.selected : ""
              }`}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={chosenElements.includes(String(product.id))}
                    size="small"
                    onChange={() => toggleChosenElement(String(product.id))}
                    sx={{
                      color: "#999",
                      "&.Mui-checked": { color: "blue" },
                    }}
                  />
                }
                label=""
              />

              <div className={cls.cellTitle}>
                <div className={cls.imagePlaceholder}></div>
                <div className={cls.textWrapper}>
                  <div className={cls.titleText} title={product.title}>
                    {product.title.length > 25
                      ? product.title.slice(0, 25) + "..."
                      : product.title}
                  </div>
                  <div className={cls.categoryText}>
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </div>
                </div>
              </div>

              <div className={cls.cell}>{product.brand || "-"}</div>
              <div className={cls.cell}>{product.sku}</div>
              <div className={cls.cell}>
                <span style={{ color: product.rating < 3 ? "red" : "inherit" }}>
                  {product.rating.toFixed(1)}
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
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      />
    </div>
  );
};
