import { LoadingData } from "@/components/LoadingData";
import ProductCard from "@/components/ProductCard";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import Autoplay from "embla-carousel-autoplay";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="min-w-full">
      <div className="text-center text-3xl font-bold mt-5 mb-2">
        {t("homePage.title")}
      </div>
      {breadcrumbs}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{t("homePage.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center flex-col">
            <Carousel
              className="w-fit max-w-[300px] sm:max-w-[405px] max-h-xs mx-2"
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
            >
              <CarouselContent className="items-center">
                {products?.map((product) => (
                  <CarouselItem key={product.id}>
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:block" />
              <CarouselNext className="hidden sm:block" />
            </Carousel>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
