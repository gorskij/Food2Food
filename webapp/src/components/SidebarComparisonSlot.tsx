import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Banana, Carrot, Heart, Plus, Search, Trash, Utensils } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { useComparisonStore } from "@/store/comparisonStore";
import { SidebarMenuButton } from "./ui/sidebar";

interface SidebarComparisonSlotProps {
  slot: "product1" | "product2"
};

const SidebarComparisonSlot: React.FC<SidebarComparisonSlotProps> = ({ slot }) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useUserStore();
  const { product1, product2, removeProduct } = useComparisonStore();


  const product = slot === "product1" ? product1 : product2;

  if (!product) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="items-center">
            <Plus />
            {t("sidebarComparisonSlot.addProduct")}
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-auto p-1">
          <DropdownMenuItem asChild>
            <NavLink
              to="/products"
              className="hover:bg-accent hover:text-accent-foreground p-2 block cursor-pointer"
            >
              <div className="flex items-center">
                <Utensils className="mr-2" />
                {t("sidebarComparisonSlot.browseProducts")}
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
                  {t("sidebarComparisonSlot.favoriteProducts")}
                </div>
              </NavLink>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="items-center">
          {slot === "product1" ? <Banana /> : <Carrot />}
          {product.productName}
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-auto p-1">
        <DropdownMenuItem>
          <NavLink
            to={`/products/${product.id}`}
            className="flex items-center space-x-2 w-full"
          >
            <Search className="mr-2" />
            {t("sidebarComparisonSlot.details")}
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            if (slot) removeProduct(slot);
          }}
          className="cursor-pointer"
        >
          <Trash />
          {t("sidebarComparisonSlot.removeProduct")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  );
};

export default SidebarComparisonSlot;
