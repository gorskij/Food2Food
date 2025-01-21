import { useGetProducts } from "@/data/products/useGetProducts";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ChevronsLeft, ChevronsRight, FilterX, Search } from "lucide-react";
import { LoadingData } from "@/components/LoadingData";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [pendingSearch, setPendingSearch] = useState("");
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetProducts({
    pageNumber: currentPage,
    pageSize: 10,
    name: searchName,
  });

  useEffect(() => {
    if (pendingSearch === "") {
      handleSearch();
    }
  }, [pendingSearch]);

  const handleSearch = () => {
    setSearchName(pendingSearch);
    setCurrentPage(0);
  };

  const handleClearFilters = () => {
    setPendingSearch("");
  };

  const breadcrumbs = useBreadcrumbs([
    { title: t("productsPage.breadcrumbs.home"), path: "/" },
    { title: t("productsPage.breadcrumbs.list"), path: "/products" },
  ]);

  if (isLoading) return <LoadingData />;
  if (isError)
    return (
      <div>
        {t("error.loadingError")}
        <RefreshQueryButton queryKeys={["products"]} />
      </div>
    );

  return (
    <div className="min-w-full">
      <div className="text-center text-3xl font-bold mt-5 mb-2">
        {t("productsPage.title")}
      </div>
      {breadcrumbs}
      <div className="flex justify-end mr-6">
        <div className="flex w-full max-w-sm items-center mt-4">
          <Input
            type="text"
            placeholder={t("productsPage.searchPlaceholder")}
            value={pendingSearch}
            onChange={(e) => setPendingSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button
            onClick={handleSearch}
            variant="ghost"
            size="icon"
            className="mx-1"
          >
            <Search />
          </Button>
          <Button onClick={handleClearFilters} variant="ghost" size="icon">
            <FilterX />
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Button
          variant="outline"
          className="mx-6"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        >
          <ChevronsLeft />
        </Button>
        <span>
          {t("productsPage.pageIndicator", {
            currentPage: data?.page.totalPages === 0 ? 0 : currentPage + 1,
            totalPages: data?.page.totalPages,
          })}
        </span>
        <Button
          variant="outline"
          className="mx-6"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, (data?.page.totalPages || 1) - 1)
            )
          }
        >
          <ChevronsRight />
        </Button>
      </div>
      <div className="relative mt-1 flex flex-col justify-center align-content mr-4">
        <div className="flex flex-wrap justify-center gap-4">
          {data?.content.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
