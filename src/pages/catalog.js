import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, Suspense } from "react";
const CatalogBlock = lazy(() => import("@/components/Catalog/Catalog"));
const CatalogPage = () => {
    return (_jsx(Suspense, { fallback: _jsx("div", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430..." }), children: _jsx(CatalogBlock, {}) }));
};
export default CatalogPage;
