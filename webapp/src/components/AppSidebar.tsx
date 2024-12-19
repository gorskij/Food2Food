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

const items = [
  {
    title: "Strona Główna",
    url: "/",
    icon: Home,
  },
  {
    title: "Lista Produktów",
    url: "/products",
    icon: Utensils,
  },
  {
    title: "Porównaj Produkty",
    url: "/compare",
    icon: UtensilsCrossed,
  },
];

export function AppSidebar() {
  const { isAuthenticated } = useUserStore();

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
              Twoje <Separator />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/user/favorite-products">
                      <Heart />
                      Ulubione Produkty
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Sheet>
                    <SidebarMenuButton asChild>
                      <SheetTrigger>
                        <NotebookPen />
                        Edytuj Preferencje Żywieniowe
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
