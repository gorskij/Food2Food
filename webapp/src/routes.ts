import { RouteObject } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import BaseLayout from "./layouts/BaseLayout";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

export const routes = [
  {
    path: "/",
    Component: BaseLayout,
    children: [
      { path: "/", Component: HomePage },
      { path: "/products", Component: ProductsPage },
      { path: "/products/:id", Component: ProductDetailsPage },
    ],
  },
] satisfies RouteObject[];
