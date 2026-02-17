import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BottomBlock } from "./BottomBlock/BottomBlock";
import { TopBlock } from "./TopBlock/TopBlock";
import cls from "./Catalog.module.scss";
const CatalogBlock = () => {
    return (_jsxs("div", { className: cls.page, children: [_jsx(TopBlock, {}), _jsx(BottomBlock, {})] }));
};
export default CatalogBlock;
