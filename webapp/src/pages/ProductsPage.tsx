import { useGetProducts } from "@/data/products/useGetProducts";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  Ellipsis,
  Plus,
  Search,
} from "lucide-react";
import { LoadingData } from "@/components/LoadingData";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, isError } = useGetProducts({
    pageNumber: currentPage,
    pageSize: 10,
  });

  const breadcrumbs = useBreadcrumbs([
    { title: "Strona Główna", path: "/" },
    { title: "Lista Produktów", path: "/products" },
  ]);

  // Placeholder image URL
  const placeholderImg = "https://via.placeholder.com/150";

  if (isLoading) return <LoadingData />;
  if (isError)
    return (
      <div>
        Wystąpił błąd przy wczytywaniu danych.
        <RefreshQueryButton queryKeys={["products"]} />
      </div>
    );

  return (
    <div className="max-w-full">
      <div className="text-center text-3xl font-bold">Lista Produktów</div>
      {breadcrumbs}
      <div className="flex justify-center items-center mt-4">
        <Button
          variant="outline"
          className="mx-6"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        >
          <ChevronsLeft />
        </Button>
        <span>
          Strona {currentPage + 1} z {data?.totalPages}
        </span>
        <Button
          variant="outline"
          className="mx-6"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, (data?.totalPages || 1) - 1)
            )
          }
        >
          <ChevronsRight />
        </Button>
      </div>
      <div className="relative mt-1 flex flex-col justify-center align-content mr-4">
        <div className="flex flex-wrap justify-center gap-4">
          {data?.content.map((product) => {
            const productImg = product.labelImage
              ? `data:image/jpeg;base64,${product.labelImage}`
              : placeholderImg;

            return (
              <div
                key={product.id}
                className="flex flex-col items-center p-4 border rounded shadow-md"
                style={{ width: "400px" }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="ml-auto py-2 px-4">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" className="w-30">
                    <DropdownMenuItem>
                      <NavLink
                        to={`/products/${product.id}`}
                        className="flex items-center space-x-2 w-full"
                      >
                        <Search className="mr-2" />
                        Sczegóły&nbsp;Produktu
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="flex items-center space-x-2 w-full">
                        <Plus className="mr-2" />
                        Dodaj do porównania
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <img
                  src={productImg}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 text-lg font-bold text-center">
                  {product.productName}
                </h3>
                <span className="text-sm text-center">
                  {product.productDescription}
                </span>
                <span className="text-sm text-left">
                  Kod EAN:&nbsp;{product.ean}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
