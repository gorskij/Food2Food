import { LoadingData } from "@/components/LoadingData";
import ProductCard from "@/components/ProductCard";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetTopProducts } from "@/data/products/useGetProducts";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const HomePage: FC = () => {
  const { data: products, isLoading, isError } = useGetTopProducts();
  const { t } = useTranslation();
  const breadcrumbs = useBreadcrumbs([
    { title: t("homePage.breadcrumbs.home"), path: "/" },
  ]);

  if (isLoading) return <LoadingData />;
  if (isError)
    return (
      <div>
        {t("error.loadingError")}
        <RefreshQueryButton queryKeys={["top-products"]} />
      </div>
    );

  return (
    <div>
      <div className="text-center text-3xl font-bold mt-5 mb-2">
        {t("homePage.title")}
      </div>
      {breadcrumbs}
      <div className="p-20">
        <Carousel
          className="w-full max-w-xs sm:max-w-sm md:max-w-md max-h-xs "
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="items-center">
            {products?.map((product) => (
              <CarouselItem key={product.id}>
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
