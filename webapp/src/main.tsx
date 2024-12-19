import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import "@/i18n";
import { ProtectedRoutes, UnprotectedRoutes } from "./routes";
import AuthGuard from "./AuthGuard";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  ...UnprotectedRoutes,
  {
    path: "/",
    Component: AuthGuard,
    children: ProtectedRoutes,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
