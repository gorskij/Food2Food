import {
  Utensils,
  UtensilsCrossed,
  Home,
  Heart,
  NotebookPen,
  Eraser,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { useTranslation } from "react-i18next";
import { Separator } from "./ui/separator";
import { useComparisonStore } from "@/store/comparisonStore";
import SidebarComparisonSlot from "./SidebarComparisonSlot";

export function AppSidebar() {
  const { t } = useTranslation();
  const { isAuthenticated } = useUserStore();
  const { clearProducts } = useComparisonStore();

  const items = [
    {
      title: t("appSidebar.home"),
      url: "/",
      icon: Home,
    },
    {
      title: t("appSidebar.productList"),
      url: "/products",
      icon: Utensils,
    },
  ];

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      <item.icon />
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {isAuthenticated() ? (
          <>
            <Separator className="mx-2 w-9/10" />
            <SidebarGroup>
              <SidebarGroupLabel>
                {t("appSidebar.yourSection")}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/user/favorite-products">
                        <Heart />
                        {t("appSidebar.favorites")}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/user/preferences">
                        <NotebookPen />
                        {t("appSidebar.editPreferences")}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <></>
        )}
        <Separator className="mx-2 w-9/10" />
        <SidebarGroup>
          <SidebarGroupLabel>
            {t("appSidebar.comparisonSection")}
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/compare">
                  <UtensilsCrossed />
                  {t("appSidebar.compareProducts")}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem >
              <SidebarMenuButton onClick={clearProducts}>
                <Eraser />
                {t("appSidebar.clearComparison")}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            {t("appSidebar.slot1")}
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem >
              <SidebarComparisonSlot slot="product1" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            {t("appSidebar.slot2")}
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem >
              <SidebarComparisonSlot slot="product2" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
