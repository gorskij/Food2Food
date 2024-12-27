import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { Ellipsis, Plus, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  product: {
    id: string;
    productName: string;
    productDescription: string;
    labelImage?: string | null;
    ean: string;
  };
  placeholderImg?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, placeholderImg }) => {
  const { t } = useTranslation();

  const productImg = product.labelImage
    ? `data:image/jpeg;base64,${product.labelImage}`
    : placeholderImg || "https://via.placeholder.com/150";

  return (
    <div
      className="flex flex-col items-center p-4 border rounded shadow-md"
      style={{ width: "400px" }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="ml-auto py-2 px-4">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-30">
          <DropdownMenuItem>
            <NavLink
              to={`/products/${product.id}`}
              className="flex items-center space-x-2 w-full"
            >
              <Search className="mr-2" />
              {t("productCard.dropdown.details")}
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="flex items-center space-x-2 w-full">
              <Plus className="mr-2" />
              {t("productCard.dropdown.addToComparison")}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <img
        src={productImg}
        alt={product.productName}
        className="w-full max-h-48 object-contain rounded"
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
