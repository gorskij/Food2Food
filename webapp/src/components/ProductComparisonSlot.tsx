import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Banana,
  Carrot,
  Ellipsis,
  Heart,
  Plus,
  Search,
  Trash,
  Utensils,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { useComparisonStore } from "@/store/comparisonStore";
import { Button } from "./ui/button";

interface ProductComparisonSlotProps {
  product?: {
    id: string;
    productName: string;
    productDescription: string;
    labelImage?: string | null;
    ean: string;
  };
  icon: string;
}

const ProductComparisonSlot: React.FC<ProductComparisonSlotProps> = ({
  product,
  icon,
}) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useUserStore();
  const { product1, product2, removeProduct } = useComparisonStore();

  const getProductSlot = () => {
    if (product?.id === product1?.id) return "product1";
    if (product?.id === product2?.id) return "product2";
    return null;
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center w-full rounded">
        <div className="flex flex-col items-center">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                  <Plus />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-auto p-1">
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/products"
                    className="hover:bg-accent hover:text-accent-foreground p-2 block cursor-pointer"
                  >
                    <div className="flex items-center">
                      <Utensils className="mr-2" />
                      {t("productComparisonSlot.browseProducts")}
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                {isAuthenticated() && (
                  <DropdownMenuItem asChild>
                    <NavLink
                      to="/user/favorite-products"
                      className="hover:bg-accent hover:text-accent-foreground p-2 block cursor-pointer"
                    >
                      <div className="flex items-center">
                        <Heart className="mr-2" />
                        {t("productComparisonSlot.favoriteProducts")}
                      </div>
                    </NavLink>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h3 className="mt-4 text-lg font-bold text-center">
            {t("productComparisonSlot.noData")}
          </h3>
          <span className="text-sm text-center text-gray-500">
            {t("productComparisonSlot.selectProduct")}
          </span>
        </div>
      </div>
    );
  }

  const productImg = product.labelImage
    ? `data:image/jpeg;base64,${product.labelImage}`
    : "public\\150.png";

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-full flex justify-end">
        {icon === "banana" && <Banana />}
        {icon === "carrot" && <Carrot />}

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
                {t("productComparisonSlot.details")}
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                onClick={() => {
                  const slot = getProductSlot();
                  if (slot) removeProduct(slot);
                }}
              >
                <Trash />
                {t("productComparisonSlot.removeProduct")}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <img
        src={productImg}
        alt={product.productName}
        className="w-full h-auto max-h-48 object-contain rounded hidden sm:block"
      />

      <h3 className="mt-2 text-base md:text-lg font-bold text-center">
        {product.productName}
      </h3>
    </div>
  );
};

export default ProductComparisonSlot;
