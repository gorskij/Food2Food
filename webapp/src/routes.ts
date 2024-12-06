import { RouteObject } from "react-router-dom";
import ProductsPage from "./pages/Products";
import BaseLayout from "./layouts/BaseLayout";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetails";
import ComparePage from "./pages/Compare";
import FavouriteProductsPage from "./pages/FavoriteProducts";
import LoginPage from "./pages/Login";

export const routes = [
  {
    path: "/",
    Component: BaseLayout,
    children: [
      { path: "/", Component: HomePage },
      { path: "/products", Component: ProductsPage },
      { path: "/products/:id", Component: ProductDetailsPage },
      { path: "/compare", Component: ComparePage },
      { path: "/favorite-products", Component: FavouriteProductsPage },
      { path: "/login", Component: LoginPage },
    ],
  },
] satisfies RouteObject[];
