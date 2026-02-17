import { lazy, Suspense } from "react";

const CatalogBlock = lazy(() => import("@/components/Catalog/Catalog"));

const CatalogPage = () => {
  return (
    <Suspense fallback={<div>Загрузка каталога...</div>}>
      <CatalogBlock />
    </Suspense>
  );
};

export default CatalogPage;
