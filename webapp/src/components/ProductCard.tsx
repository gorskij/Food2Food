import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { Ellipsis, Plus, RefreshCcw, Search, Trash } from "lucide-react";  // Added Trash icon
import { useTranslation } from "react-i18next";
import { useComparisonStore } from "@/store/comparisonStore";

interface ProductCardProps {
  product: {
    id: string;
    productName: string;
    productDescription: string;
    labelImage?: string | null;
    ean: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const { addProduct, removeProduct, replaceProduct, product1, product2 } = useComparisonStore();

  const productImg = product.labelImage
    ? `data:image/jpeg;base64,${product.labelImage}`
    : "https://via.placeholder.com/150";

  const handleUseProduct1 = () => {
    if (product1?.id === product.id) {
      removeProduct("product1");
    } else if (product2?.id === product.id) {
      replaceProduct(product, "product1")
    } else {
      addProduct(product, "product1");
    }
  };

  const handleUseProduct2 = () => {
    if (product2?.id === product.id) {
      removeProduct("product2");
    } else if (product1?.id === product.id) {
      replaceProduct(product, "product2")
    } else {
      addProduct(product, "product2");
    }
  };

  return (
    <div
      className="flex flex-col items-center p-4 border rounded shadow-md w-full sm:w-[400px]"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="ml-auto py-2 px-4">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-auto">
          <DropdownMenuItem>
            <NavLink
              to={`/products/${product.id}`}
              className="flex items-center space-x-2 w-full"
            >
              <Search className="mr-2" />
              {t("productCard.dropdown.details")}
            </NavLink>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleUseProduct1}
            className="cursor-pointer"
          >
            {product1?.id === product.id ? (
              <Trash />
            ) : product1 ? (
              <RefreshCcw />
            ) : (
              <Plus />
            )}
            {product1?.id === product.id
              ? t("productCard.dropdown.removeProduct")
              : product1
                ? `${t("productCard.dropdown.replaceProduct")} (${product1.productName})`
                : t("productCard.dropdown.addToComparison")}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleUseProduct2}
            className="cursor-pointer"
          >
            {product2?.id === product.id ? (
              <Trash />
            ) : product2 ? (
              <RefreshCcw />
            ) : (
              <Plus />
            )}
            {product2?.id === product.id
              ? t("productCard.dropdown.removeProduct")
              : product2
                ? `${t("productCard.dropdown.replaceProduct")} (${product2.productName})`
                : t("productCard.dropdown.addToComparison")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <img
        src={productImg}
        alt={product.productName}
        className="w-full max-h-48 object-contain rounded hidden sm:block"
      />
      <h3 className="mt-2 text-lg font-bold text-center">
        {product.productName}
      </h3>
      <span className="text-sm text-center">{product.productDescription}</span>
      <span className="text-sm text-left">
        {t("productCard.eanCode", { ean: product.ean })}
      </span>
    </div>
  );
};

export default ProductCard;
