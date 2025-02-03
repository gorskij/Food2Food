import { useTranslation } from "react-i18next";
import DataField from "@/components/DataField";
import FatSaturationChart from "@/components/FatSaturationChart";
import { LoadingData } from "@/components/LoadingData";
import MineralsInformation from "@/components/MineralsInformation";
import NutritionalChart from "@/components/NutritionalChart";
import Omega3Information from "@/components/Omega3Information";
import VitaminsInformation from "@/components/VitaminsInformation";
import ProductAllergens from "@/components/ProductAllergens";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import SugarContentChart from "@/components/SugarContentChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetProductDetails } from "@/data/products/useProductDetails";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";
import { FC } from "react";
import { useParams } from "react-router-dom";
import MacronutrientsInformation from "@/components/MacronutrientsInformation";
import ProductIngredientsList from "@/components/ProductIngredientsList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Plus, RefreshCcw, Trash } from "lucide-react";
import FavoriteInfo from "@/components/FavoriteInfo";
import { useComparisonStore } from "@/store/comparisonStore";
import ProducerInfo from "@/components/ProducerInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductRatings from "@/components/ProductRatings";

const ProductDetailsPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { addProduct, removeProduct, replaceProduct, product1, product2 } =
    useComparisonStore();
  const { data, isLoading, isError } = useGetProductDetails(id!);
  const placeholderImg = "\\150.png";
  const breadcrumbs = useBreadcrumbs([
    { title: t("productDetails.breadcrumbs.home"), path: "/" },
    { title: t("productDetails.breadcrumbs.productList"), path: "/products" },
    { title: data?.productName ?? "", path: `/products/${id}` },
  ]);

  const handleUseProduct1 = () => {
    if (data === undefined) return;

    if (product1?.id === data?.id) {
      removeProduct("product1");
    } else if (product2?.id === data?.id) {
      replaceProduct(data, "product1");
    } else {
      addProduct(data, "product1");
    }
  };

  const handleUseProduct2 = () => {
    if (data === undefined) return;

    if (product2?.id === data?.id) {
      removeProduct("product2");
    } else if (product1?.id === data?.id) {
      replaceProduct(data, "product2");
    } else {
      addProduct(data, "product2");
    }
  };

  if (isLoading) return <LoadingData />;
  if (isError)
    return (
      <div>
        {t("error.loadingError")}
        <RefreshQueryButton queryKeys={["productDetails"]} />
      </div>
    );

  const productIndexS = data?.productIndexes.find(
    (index) => index.indexName === "S"
  );
  const productIndexT = data?.productIndexes.find(
    (index) => index.indexName === "T"
  );

  return (
    <div className="flex flex-col gap-2 min-w-full">
      <div className="text-center text-3xl font-bold my-4">
        {t("productDetails.title")}
      </div>
      {breadcrumbs}

      {data && (
        <div className="sm:mx-5">
          <div className="flex-1 justify-between gap-4">
            <Tabs defaultValue="product">
              <TabsList className="flex justify-start flex-wrap sm:flex-nowrap h-auto w-fit">
                <TabsTrigger value="product" className="sm:flex-1 text-center">
                  {t("productDetails.productTabTrigger")}
                </TabsTrigger>
                <TabsTrigger value="details" className="sm:flex-1 text-center">
                  {t("productDetails.nutritionalValueTabTrigger")}
                </TabsTrigger>
                <TabsTrigger value="producer" className="sm:flex-1 text-center">
                  {t("productDetails.producerTabTrigger")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="product">
                <Card className="flex-1 max-w-full mb-4">
                  <CardHeader>
                    <CardTitle className="text-center">
                      <div className="flex font-normal w-full justify-end items-center mb-2">
                        <FavoriteInfo
                          favoriteCount={data.favoriteCount}
                          id={id}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Ellipsis />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom" className="w-auto">
                            <DropdownMenuItem
                              onClick={handleUseProduct1}
                              className="cursor-pointer"
                            >
                              {product1?.id === data.id ? (
                                <Trash className="mr-2" />
                              ) : product1 ? (
                                <RefreshCcw className="mr-2" />
                              ) : (
                                <Plus className="mr-2" />
                              )}
                              {product1?.id === data.id
                                ? t("productCard.dropdown.removeProduct")
                                : product1
                                ? `${t(
                                    "productCard.dropdown.replaceProduct"
                                  )} (${product1.productName})`
                                : t("productCard.dropdown.addToComparison")}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={handleUseProduct2}
                              className="cursor-pointer"
                            >
                              {product2?.id === data.id ? (
                                <Trash className="mr-2" />
                              ) : product2 ? (
                                <RefreshCcw className="mr-2" />
                              ) : (
                                <Plus className="mr-2" />
                              )}
                              {product2?.id === data.id
                                ? t("productCard.dropdown.removeProduct")
                                : product2
                                ? `${t(
                                    "productCard.dropdown.replaceProduct"
                                  )} (${product2.productName})`
                                : t("productCard.dropdown.addToComparison")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {data.productName ?? t("productDetails.noData")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap">
                    <div className="flex flex-wrap w-full">
                      <div className="sm:w-1/2 w-full pr-2 sm:pr-4">
                        <img
                          src={
                            data.label.image
                              ? `data:image/jpeg;base64,${data.label.image}`
                              : placeholderImg
                          }
                          className="w-full max-h-48 object-contain rounded hidden sm:block"
                        />
                      </div>
                      <div className="flex-1 sm:w-1/2 w-full flex-col">
                        <DataField
                          label={`${t("productDetails.description")}:`}
                          value={
                            data.productDescription ??
                            t("productDetails.noData")
                          }
                        />
                        <DataField
                          label={`${t("productDetails.eanCode")}:`}
                          value={data.ean ?? t("productDetails.noData")}
                          className="my-2"
                        />
                        <DataField
                          label={`${t("productDetails.quantity")}:`}
                          value={
                            data.productQuantity && data.unit?.name
                              ? `${data.productQuantity.toString()} ${
                                  data.unit.name
                                }`
                              : t("productDetails.noData")
                          }
                          className="my-2"
                        />
                        <DataField
                          label={`${t("productDetails.countryOfOrigin")}:`}
                          value={data.country ?? t("productDetails.noData")}
                          className="my-2"
                        />
                        <DataField
                          label={`${t("productDetails.packageType")}:`}
                          value={
                            data.packageType?.name
                              ? t(`packageTypes.${data.packageType.name}`)
                              : t("productDetails.noData")
                          }
                          className="my-2"
                        />
                        <DataField
                          label={`${t("productDetails.indexS")}:`}
                          value={
                            productIndexS
                              ? productIndexS.indexValue.toString()
                              : t("productDetails.noData")
                          }
                          className="my-2"
                        />
                        <DataField
                          label={`${t("productDetails.indexT")}:`}
                          value={
                            productIndexT
                              ? productIndexT.indexValue.toString()
                              : t("productDetails.noData")
                          }
                          className="my-2"
                        />
                      </div>
                    </div>
                    <Card className="w-full mt-2">
                      <CardHeader>
                        <CardTitle className="text-center">
                          {t("productDetails.ratingsTitle")}
                        </CardTitle>
                      </CardHeader>
                      <CardDescription className="text-center text-pretty mx-2">
                        {t("productDetails.productCharacteristicsDescription")}
                      </CardDescription>
                      <CardContent className="flex flex-row flex-wrap">
                        <ProductAllergens productDetails={data} />
                        <ProductRatings
                          productDetails={data}
                          groupName="Posiadane Certyfikaty"
                        />
                        <ProductRatings
                          productDetails={data}
                          groupName="Specyficzne Cechy"
                        />
                        <ProductRatings
                          productDetails={data}
                          groupName="Bez dodatków do żywności"
                        />
                        <ProductRatings
                          productDetails={data}
                          groupName="Zastosowane procesy technologiczne"
                        />
                        <ProductRatings
                          productDetails={data}
                          groupName="Parametry bez składników"
                        />
                      </CardContent>
                    </Card>
                    <ProductIngredientsList productDetails={data} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="details">
                <Card className="flex-1 max-w-full mt-4">
                  <CardHeader>
                    <CardTitle className="text-center">
                      {t("productDetails.nutritionalValue")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-center">
                    <Tabs defaultValue="tab-1">
                      <TabsList className="flex justify-start flex-wrap sm:flex-nowrap h-auto w-fit">
                        <TabsTrigger value="tab-1">
                          {t("productDetails.basic")}
                        </TabsTrigger>
                        <TabsTrigger value="tab-2">
                          {t("productDetails.vitaminsAndMinerals")}
                        </TabsTrigger>
                        <TabsTrigger value="tab-3">
                          {t("productDetails.omega3")}
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="tab-1">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col sm:flex-row flex-nowrap sm:flex-wrap gap-4 items-stretch">
                            <NutritionalChart productDetails={data} />
                            <MacronutrientsInformation productDetails={data} />
                          </div>
                          <div className="flex flex-col min-w-full gap-4 sm:flex-row flex-nowrap sm:flex-wrap items-stretch">
                            <FatSaturationChart productDetails={data} />
                            <SugarContentChart productDetails={data} />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="tab-2">
                        <div className="flex flex-col sm:flex-row flex-nowrap sm:flex-wrap gap-4 items-stretch">
                          <VitaminsInformation productDetails={data} />
                          <MineralsInformation productDetails={data} />
                        </div>
                      </TabsContent>
                      <TabsContent value="tab-3">
                        <Omega3Information productDetails={data} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="producer">
                <ProducerInfo productDetails={data} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
