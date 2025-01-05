import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Heart, Plus, Trash, Utensils } from "lucide-react";
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
};

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
      <div className="flex flex-col items-center w-full rounded">
        <div className="flex flex-col items-center">
          <div
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                >
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
    : "https://via.placeholder.com/150";

  return (
    <div
      className="flex flex-col items-center w-full"
    >
      <div className="w-full h-full flex justify-end">
        <Button
          variant="ghost"
          onClick={() => {
            const slot = getProductSlot();
            if (slot) removeProduct(slot);
          }}
        >
          <Trash className="" />
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
