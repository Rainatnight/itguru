import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Pagination } from "../../../Pagination/Pagination";

type Product = {
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
};

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 10;

  const fetchProducts = (page: number) => {
    setLoading(true);
    const skip = (page - 1) * itemsPerPage;
    fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.total); // total — общее количество товаров на сервере
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке товаров:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  if (loading) return <div>Загрузка товаров...</div>;

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.cellTitle}>Наименование</div>
        <div className={styles.cell}>Вендор</div>
        <div className={styles.cell}>Артикул</div>
        <div className={styles.cell}>Оценка</div>
        <div className={styles.cell}>Цена</div>
        <div className={styles.cell}>Количество</div>
        <div className={`${styles.cell} ${styles.actions}`}>Действия</div>
      </div>

      {products.map((product) => (
        <div key={product.id} className={styles.row}>
          <div className={styles.cellTitle}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styles.imagePlaceholder}></div>
              <div>
                <div className={styles.titleText}>{product.title}</div>
                <div className={styles.categoryText}>{product.category}</div>
              </div>
            </div>
          </div>
          <div className={styles.cell}>{product.brand}</div>
          <div className={styles.cell}>{product.id}</div>
          <div className={styles.cell}>{product.rating}</div>
          <div className={styles.cell}>{product.price} ₽</div>
          <div className={styles.cell}>{product.stock}</div>
          <div className={`${styles.cell} ${styles.actions}`}>
            <button className={styles.addButton}>+</button>
            <PiDotsThreeCircle size={30} />
          </div>
        </div>
      ))}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
