import {
  Utensils,
  UtensilsCrossed,
  Home,
  User2,
  ChevronsUpDown,
  Settings,
  LogOut,
  Heart,
  ChevronRight,
  NotebookPen,
  LogIn,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Sheet, SheetTrigger } from "./ui/sheet";
import NutritionalProfileSheet from "./NutritionalProfileSheet";
import { useUserStore } from "@/store/userStore";

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
  const navigate = useNavigate();
  const { isAuthenticated, username, clearToken } = useUserStore();

  const handleLogout = () => {
    clearToken();
  };

  const handleLoginNavigation = () => {
    navigate("/login");
  };

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
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Twoje
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {isAuthenticated() ? (
                    <>
                      <SidebarMenuItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                              <User2 />
                              {username}
                              <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            side="top"
                            className="w-[--radix-popper-anchor-width]"
                          >
                            <DropdownMenuItem>
                              <Settings />
                              <span>Opcje Użytkownika</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                              <LogOut />
                              <span>Wyloguj</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink to="/favorite-products">
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
                    </>
                  ) : (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLoginNavigation}>
                          <LogIn />
                          Zaloguj się
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <Carrot />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
