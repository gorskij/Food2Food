import DataField from "@/components/DataField";
import FatSaturationChart from "@/components/FatSaturationChart";
import { LoadingData } from "@/components/LoadingData";
import MineralsInformation from "@/components/MineralsInformation";
import NutritionalChart from "@/components/NutritionalChart";
import Omega3Table from "@/components/Omega3Table";
import ProductAllergens from "@/components/ProductAllergens";
import ProductIngredientsList from "@/components/ProductIngredientsList";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import SaltAndFiberTable from "@/components/SaltAndFiberTable";
import SugarContentChart from "@/components/SugarContentChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import VitaminsInformation from "@/components/VitaminsInformation";
import { useGetProductDetails } from "@/data/products/useProductDetails";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";
import { Swords } from "lucide-react";
import { FC } from "react";
import { RadarChart, PolarAngleAxis, PolarGrid, Radar } from "recharts";

const ComparePage: FC = () => {
  const product1Id = "578db518-581b-4801-8613-4d09b12ed366";
  const product2Id = "56cb13e0-de6c-4b21-8674-bed8bde850af";
  const placeholderImg = "https://via.placeholder.com/150";
  const {
    data: product1Data,
    isLoading: isLoading1,
    isError: isError1,
  } = useGetProductDetails(product1Id);

  const {
    data: product2Data,
    isLoading: isLoading2,
    isError: isError2,
  } = useGetProductDetails(product2Id);

  const breadcrumbs = useBreadcrumbs([
    { title: "Strona Główna", path: "/" },
    { title: "Porównanie Produktów", path: "/compare" },
  ]);

  if (isLoading1 || isLoading2) return <LoadingData />;
  if (isError1 || isError2)
    return (
      <div>
        Wystąpił błąd przy wczytywaniu danych.
        <RefreshQueryButton queryKeys={["productDetails"]} />
      </div>
    );

  const chartData = [
    { ratingCategory: "Smak", produkt1: 33, produkt2: 40 },
    { ratingCategory: "Jakość", produkt1: 40, produkt2: 35 },
    { ratingCategory: "Uniwersalność", produkt1: 20, produkt2: 25 },
    { ratingCategory: "Dostępność", produkt1: 15, produkt2: 20 },
    { ratingCategory: "Trwałość", produkt1: 45, produkt2: 14 },
  ];

  const chartConfig = {
    prod1: {
      label: "produkt1",
      color: "hsl(var(--chart-1))",
    },
    prod2: {
      label: "product2",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-2 min-w-full">
      <div className="text-center text-3xl font-bold my-4">
        Porównanie Produktów
      </div>
      {breadcrumbs}
      <Card className="flex-1 min-w-full max-w-full">
        <CardHeader>
          <CardTitle className="flex justify-center items-center text-center">
            <Swords />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-row gap-4">
            {/* Product 1 */}
            <div className="flex-1">
              <img
                src={
                  product1Data.data.label.image
                    ? `data:image/jpeg;base64,${product1Data.data.label.image}`
                    : placeholderImg
                }
                alt="Product 1"
                className="w-40 h-40 object-cover mx-auto"
              />
              <div className="text-center font-bold">
                {product1Data.data.productName ?? "Brak danych"}
              </div>
            </div>
            {/* Product 2 */}
            <div className="flex-1">
              <img
                src={
                  product2Data.data.label.image
                    ? `data:image/jpeg;base64,${product2Data.data.label.image}`
                    : placeholderImg
                }
                alt="Product 2"
                className="w-40 h-40 object-cover mx-auto"
              />
              <div className="text-center font-bold">
                {product2Data.data.productName ?? "Brak danych"}
              </div>
            </div>
          </div>

          {/* Accordion */}
          <Accordion
            type="single"
            collapsible
            className="min-w-full"
            defaultValue="item-1"
          >
            {/* Basic Information */}
            <AccordionItem value="item-1">
              <AccordionTrigger>Podstawowe Informacje</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <DataField
                    label="Opis:"
                    value={
                      product1Data.data.productDescription ?? "Brak danych"
                    }
                  />
                  <DataField
                    label="Opis:"
                    value={
                      product2Data.data.productDescription ?? "Brak danych"
                    }
                  />
                  <DataField
                    label="Kod EAN:"
                    value={product1Data.data.ean ?? "Brak danych"}
                  />
                  <DataField
                    label="Kod EAN:"
                    value={product2Data.data.ean ?? "Brak danych"}
                  />
                  <DataField
                    label="Kraj pochodzenia:"
                    value={product1Data.data.country ?? "Brak danych"}
                  />
                  <DataField
                    label="Kraj pochodzenia:"
                    value={product2Data.data.country ?? "Brak danych"}
                  />
                  <ProductAllergens productDetails={product1Data.data} />
                  <ProductAllergens productDetails={product2Data.data} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Nutritional Information */}
            <AccordionItem value="item-2">
              <AccordionTrigger>Wartości Odżywcze</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex-1 min-w-full">
                    <div className="flex flex-row min-w-full gap-4 flex-wrap">
                      <NutritionalChart productDetails={product1Data.data} />
                      <SaltAndFiberTable productDetails={product1Data.data} />
                    </div>
                    <div className="flex flex-row min-w-full gap-4 flex-wrap mt-4">
                      <FatSaturationChart productDetails={product1Data.data} />
                      <SugarContentChart productDetails={product1Data.data} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-full">
                    <div className="flex flex-row min-w-full gap-4 flex-wrap">
                      <NutritionalChart productDetails={product2Data.data} />
                      <SaltAndFiberTable productDetails={product2Data.data} />
                    </div>
                    <div className="flex flex-row min-w-full gap-4 flex-wrap mt-4">
                      <FatSaturationChart productDetails={product2Data.data} />
                      <SugarContentChart productDetails={product2Data.data} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Vitamins */}
            <AccordionItem value="item-3">
              <AccordionTrigger>Witaminy i minerały</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[450px]">
                    <VitaminsInformation productDetails={product1Data.data} />
                  </div>
                  <div className="flex-1 min-w-[450px]">
                    <VitaminsInformation productDetails={product2Data.data} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex-1 min-w-[450px]">
                    <MineralsInformation productDetails={product1Data.data} />
                  </div>
                  <div className="flex-1 min-w-[450px]">
                    <MineralsInformation productDetails={product2Data.data} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Omega-3 */}
            <AccordionItem value="item-4">
              <AccordionTrigger>Kwasy Omega-3</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <Omega3Table productDetails={product1Data.data} />
                  <Omega3Table productDetails={product2Data.data} />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Skład</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <ProductIngredientsList productDetails={product1Data.data} />
                  <ProductIngredientsList productDetails={product2Data.data} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparePage;
