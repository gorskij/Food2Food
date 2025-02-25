import { LoadingData } from "@/components/LoadingData";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetFavoriteProducts } from "@/data/products/useGetFavoriteProducts";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";
import {
  ChevronsLeft,
  ChevronsRight,
  FilterX,
  Search,
  Utensils,
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

const FavouriteProductsPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [pendingSearch, setPendingSearch] = useState("");
  const { data, isLoading, isError } = useGetFavoriteProducts({
    pageNumber: currentPage,
    pageSize: 10,
    name: searchName,
  });

  useEffect(() => {
    if (pendingSearch === "") {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSearch]);

  const handleSearch = () => {
    setSearchName(pendingSearch);
    setCurrentPage(0);
  };

  const handleClearFilters = () => {
    setPendingSearch("");
  };

  const breadcrumbs = useBreadcrumbs([
    { title: t("favouriteProducts.breadcrumbs.home"), path: "/" },
    {
      title: t("favouriteProducts.breadcrumbs.list"),
      path: "/favorite-products",
    },
  ]);

  if (isLoading) return <LoadingData />;
  if (isError)
    return (
      <div>
        {t("error.loadingError")}
        <RefreshQueryButton queryKeys={["favoriteProducts"]} />
      </div>
    );

  const hasNoProducts = data?.content.length === 0;

  return (
    <div className="min-w-full">
      <div className="text-center text-3xl font-bold mt-5 mb-2">
        {t("favouriteProducts.title")}
      </div>
      {breadcrumbs}
      <div className="flex justify-end mr-6">
        <div className="flex w-full max-w-sm items-center mt-4">
          <Input
            type="text"
            placeholder={t("favouriteProducts.searchPlaceholder")}
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
      {hasNoProducts ? (
        <div className="flex flex-col items-center mt-8">
          <p className="mb-4 text-lg">{t("favouriteProducts.noProducts")}</p>
          <Button onClick={() => navigate("/products")} variant="outline">
            <Utensils />
            {t("favouriteProducts.browseProducts")}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center mt-4">
            <Button
              variant="outline"
              className="mx-6"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            >
              <ChevronsLeft />
            </Button>
            <span>
              {t("favouriteProducts.pageIndicator", {
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
        </>
      )}
    </div>
  );
};

export default FavouriteProductsPage;
