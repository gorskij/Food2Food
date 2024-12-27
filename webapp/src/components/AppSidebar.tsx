import {
  Utensils,
  UtensilsCrossed,
  Home,
  Heart,
  NotebookPen,
  Carrot,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { Sheet, SheetTrigger } from "./ui/sheet";
import NutritionalProfileSheet from "./NutritionalProfileSheet";
import { useUserStore } from "@/store/userStore";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const { t } = useTranslation();
  const { isAuthenticated } = useUserStore();

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
    {
      title: t("appSidebar.compareProducts"),
      url: "/compare",
      icon: UtensilsCrossed,
    },
  ];

  return (
    <Sidebar collapsible="icon">
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
          <SidebarGroup>
            <SidebarGroupLabel>
            {t("appSidebar.yourSection")} <Separator />
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
                  <Sheet>
                    <SidebarMenuButton asChild>
                      <SheetTrigger>
                        <NotebookPen />
                        {t("appSidebar.editPreferences")}
                      </SheetTrigger>
                    </SidebarMenuButton>
                    <NutritionalProfileSheet />
                  </Sheet>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <></>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <Carrot />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
