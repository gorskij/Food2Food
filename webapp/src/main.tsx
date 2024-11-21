import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "./components/ui/toaster";
import "./index.css";
import { routes } from "./routes";

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <Toaster /> */}
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
