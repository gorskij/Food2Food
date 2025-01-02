import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Heart, Plus, Trash, Utensils } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ProductDetails } from "@/types/ProductDetails";
import { useUserStore } from "@/store/userStore";
import { useComparisonStore } from "@/store/comparisonStore";
import { Button } from "./ui/button";

interface ProductComparisonSlotProps {
  product?: ProductDetails;
}

const ProductComparisonSlot: React.FC<ProductComparisonSlotProps> = ({ product }) => {
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
      <div className="flex flex-col items-center w-full sm:w-[300px] rounded">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-accent flex justify-center items-center rounded-md">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-full h-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition"
                  aria-label={t("productComparisonSlot.addProduct")}
                >
                  <Plus className="w-8 h-8" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-auto p-1">
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/products"
                    className="hover:bg-accent hover:text-accent-foreground p-2 block cursor-pointer"
                  >
                    <div className="flex items-center">
                      <Utensils className="mr-2 h-4 w-4" />
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
                        <Heart className="mr-2 h-4 w-4" />
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

  const productImg = product.label.image
    ? `data:image/jpeg;base64,${product.label.image}`
    : "https://via.placeholder.com/150";

  return (
    <div
      className="flex flex-col items-center w-full sm:w-[300px]"
    >
      <div className="w-full h-full flex justify-end">
        <Button
          variant="ghost"
          onClick={() => {
            const slot = getProductSlot();
            if (slot) removeProduct(slot);
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>

      </div>
      <img
        src={productImg}
        alt={product.productName}
        className="w-full max-h-48 object-contain rounded hidden sm:block"
      />
      <h3 className="mt-2 text-lg font-bold text-center">
        {product.productName}
      </h3>
    </div>
  );
};

export default ProductComparisonSlot;
