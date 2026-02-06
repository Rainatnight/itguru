import { useEffect, useState } from "react";
import styles from "./Products.module.scss";

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

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке товаров:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка товаров...</div>;

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
            <button>Редактировать</button>
            <button>Удалить</button>
          </div>
        </div>
      ))}
    </div>
  );
};
