import { RouteObject } from "react-router-dom";
import ProductsPage from "./pages/Products";
import BaseLayout from "./layouts/BaseLayout";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetails";
import ComparePage from "./pages/Compare";
import FavouriteProductsPage from "./pages/FavoriteProducts";
import GoogleCallback from "./pages/GoogleCallback";
import GithubCallback from "./pages/GithubCallback";
import UserPreferencePage from "./pages/UserPreference";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

export const UnprotectedRoutes: RouteObject[] = [
  {
    path: "/",
    Component: BaseLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "products", Component: ProductsPage },
      { path: "products/:id", Component: ProductDetailsPage },
      { path: "compare", Component: ComparePage },
      { path: "auth/google/callback", Component: GoogleCallback },
      { path: "auth/github/callback", Component: GithubCallback },
    ],
  },
];

const UserRoutes: RouteObject[] = [
  { index: true, Component: HomePage },
  { path: "favorite-products", Component: FavouriteProductsPage },
  { path: "user-preference", Component: UserPreferencePage },
];

const AdminRoutes: RouteObject[] = [{ index: true, Component: HomePage }];

export const ProtectedRoutes: RouteObject[] = [
  {
    path: "user",
    Component: UserLayout,
    children: UserRoutes,
  },
  {
    path: "admin",
    Component: AdminLayout,
    children: AdminRoutes,
  },
];
