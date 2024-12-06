import DataField from "@/components/DataField";
import FatSaturationChart from "@/components/FatSaturationChart";
import { LoadingData } from "@/components/LoadingData";
import MineralsTable from "@/components/MineralsTable";
import NutritionalChart from "@/components/NutritionalChart";
import Omega3Table from "@/components/Omega3Table";
import VitaminsTable from "@/components/VitaminsTable";
import ProductAllergens from "@/components/ProductAllergens";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import SugarContentChart from "@/components/SugarContentChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProductDetails } from "@/data/products/useProductDetails";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";
import { FC } from "react";
import { useParams } from "react-router-dom";
import SaltAndFiberTable from "@/components/SaltAndFiberTable";
import ProductIngredientsList from "@/components/ProductIngredientsList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Plus, Heart } from "lucide-react";
import FavoriteInfo from "@/components/FavoriteInfo";

const ProductDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductDetails(id!);
  const placeholderImg = "https://via.placeholder.com/150";

  const breadcrumbs = useBreadcrumbs([
    { title: "Strona Główna", path: "/" },
    { title: "Lista Produktów", path: "/products" },
    { title: data?.data.productName ?? "", path: `/products/${id}` },
  ]);

  if (isLoading) return <LoadingData />;
  if (isError)
    return (
      <div>
        Wystąpił błąd przy wczytywaniu danych.
        <RefreshQueryButton queryKeys={["productDetails"]} />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 min-w-full">
      <div className="text-center text-3xl font-bold my-4">
        Szczegóły Produktu
      </div>
      {breadcrumbs}

      {data && (
        <div className="mx-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-auto pb-2 px-4">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="w-30">
              <DropdownMenuItem>
                <span className="flex items-center space-x-2 w-full">
                  <Plus className="mr-2" />
                  Dodaj do porównania
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="flex items-center space-x-2 w-full">
                  <Heart className="mr-2" />
                  Dodaj do ulubionych
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex flex-wrap justify-between gap-4">
            <Card className="flex-1 min-w-[725px] max-w-full">
              <CardHeader>
                <CardTitle className="text-center">
                  {data.data.productName ?? "Brak danych"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-start">
                <img
                  src={
                    data.data.label.image
                      ? `data:image/jpeg;base64,${data.data.label.image}`
                      : placeholderImg
                  }
                  alt="Obrazek produktu"
                  className="w-40 h-40 object-cover m-10"
                />
                <div className="flex-1 justify-center flex-col">
                  <DataField
                    label="Opis :"
                    value={data.data.productDescription ?? "Brak danych"}
                  />
                  <DataField
                    label="Kod EAN :"
                    value={data.data.ean ?? "Brak danych"}
                    className="my-2"
                  />
                  <DataField
                    label="Ilość :"
                    value={
                      data.data.productQuantity && data.data.unit?.name
                        ? `${data.data.productQuantity.toString()} ${
                            data.data.unit.name
                          }`
                        : "Brak danych"
                    }
                    className="my-2"
                  />
                  <DataField
                    label="Kraj pochodzenia :"
                    value={data.data.country ?? "Brak danych"}
                    className="my-2"
                  />
                  <DataField
                    label="Typ Opakowania :"
                    value={data.data.packageType?.name ?? "Brak danych"}
                    className="my-2"
                  />
                </div>
                <div>
                  <FavoriteInfo favoriteCount={data.data.favoriteCount} />
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 min-w-[525px] max-w-full">
              <CardHeader>
                <CardTitle className="text-left">
                  Informacje o producencie
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center flex-col">
                <DataField
                  label="Producent :"
                  value={data.data.producer?.name ?? "Brak danych"}
                  className="border-b py-1 my-1"
                />
                <DataField
                  label="Adres :"
                  value={data.data.producer.address ?? "Brak danych"}
                  className="my-2"
                />
                <DataField
                  label="NIP :"
                  value={data.data.producer.NIP ?? "Brak danych"}
                  className="my-2"
                />
                <DataField
                  label="Kontakt :"
                  value={data.data.producer.contact ?? "Brak danych"}
                  className="my-2"
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-row min-w-full gap-4 flex-wrap">
            <ProductAllergens productDetails={data.data} />
          </div>
          <Card className="flex-1 max-w-full mt-4">
            <CardHeader>
              <CardTitle className="text-left">Wartość odżywcza</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Accordion
                type="single"
                collapsible
                className="min-w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>Podstawowe</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="flex flex-row min-w-full gap-4 flex-wrap">
                      <NutritionalChart productDetails={data.data} />
                      <SaltAndFiberTable productDetails={data.data} />
                    </div>
                    <div className="flex flex-row min-w-full gap-4 flex-wrap">
                      <FatSaturationChart productDetails={data.data} />
                      <SugarContentChart productDetails={data.data} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Witaminy</AccordionTrigger>
                  <AccordionContent>
                    <VitaminsTable productDetails={data.data} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Minerały</AccordionTrigger>
                  <AccordionContent>
                    <MineralsTable productDetails={data.data} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Kwasy Omega-3</AccordionTrigger>
                  <AccordionContent>
                    <Omega3Table productDetails={data.data} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Dodatkowe</AccordionTrigger>
                  <AccordionContent>item-5</AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <ProductIngredientsList productDetails={data.data} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
