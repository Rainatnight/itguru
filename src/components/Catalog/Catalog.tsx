import { BottomBlock } from "./BottomBlock/BottomBlock";
import cls from "./Catalog.module.scss";
import { TopBlock } from "./TopBlock/TopBlock";

export const CatalogBlock = () => {
  return (
    <div className={cls.page}>
      <TopBlock />
      <BottomBlock />
    </div>
  );
};
