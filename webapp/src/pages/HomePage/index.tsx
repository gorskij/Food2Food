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
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import { Utensils, UtensilsCrossed } from "lucide-react";

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

      <div className="text-center text-xl font-bold mt-5 mb-2">
        {t("homePage.popularItems")}
      </div>

      <div className="flex justify-center items-center flex-col">
        <Carousel
          className="w-full max-w-[300px] sm:max-w-[405px] max-h-xs mb-5 mx-2"
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
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        <div className="text-center items-center flex flex-col gap-2">
          <div>{t("homePage.descriptionOfFunctionality")}</div>
          <div className="flex flex-row justify-center w-full gap-2 flex-wrap">
            <Button variant={"outline"} asChild>
              <NavLink to="/products">
                <Utensils />
                {t("homePage.productList")}
              </NavLink>
            </Button>
            <Button variant={"outline"} asChild>
              <NavLink to="/compare">
                <UtensilsCrossed />
                {t("homePage.compareProducts")}
              </NavLink>
            </Button>
          </div>
          <div>{t("homePage.knowMore")}</div>
          <div className="flex flex-col justify-center gap-2 items-center">
            <img
              src="/cbzf.png"
              className="w-auto h-auto max-w-[200px] object-contain"
            />
            <Button variant="outline" asChild className="h-fit">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to="https://cbzf.pl/o-nas/"
                className="flex flex-wrap"
              >
                <p className="whitespace-normal text-center">
                  CENTRUM BADAWCZE NAD ŻYWNOŚCIĄ FUNKCJONALNĄ SP. Z O.O.
                </p>
              </Link>
            </Button>
            <img
              src="/ffood.png"
              className="w-auto h-auto max-w-[200px] object-contain"
            />
            <Button variant="outline" asChild>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to="https://f-food.pl/"
              >
                {t("homePage.FFoodLink")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
