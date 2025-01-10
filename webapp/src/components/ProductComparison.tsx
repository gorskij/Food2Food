import { FC } from "react";
import DataField from "@/components/DataField";
import FatSaturationChart from "@/components/FatSaturationChart";
import MineralsInformation from "@/components/MineralsInformation";
import NutritionalChart from "@/components/NutritionalChart";
import Omega3Table from "@/components/Omega3Table";
import ProductAllergens from "@/components/ProductAllergens";
import ProductIngredientsList from "@/components/ProductIngredientsList";
import MacronutrientsInformation from "@/components/MacronutrientsInformation";
import SugarContentChart from "@/components/SugarContentChart";
import VitaminsInformation from "@/components/VitaminsInformation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductDetails } from "@/types/ProductDetails";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { t } from "i18next";
import ProductRatings from "./ProductRatings";
import FavoriteInfo from "./FavoriteInfo";

interface ProductComparisonProps {
  product1: ProductDetails | undefined;
  product2: ProductDetails | undefined;
}

const ProductComparison: FC<ProductComparisonProps> = ({ product1, product2 }) => {
  const placeholder = "Brak danych";

  return (
    <div className="flex flex-col min-w-full">
      <Tabs defaultValue="basic-info">
        <TabsList className="flex justify-start flex-wrap sm:flex-nowrap h-auto w-fit">
          <TabsTrigger value="basic-info" className="sm:flex-1 text-center">Podstawowe Informacje</TabsTrigger>
          <TabsTrigger value="nutritional-info" className="sm:flex-1 text-center">Wartości Odżywcze</TabsTrigger>
          <TabsTrigger value="vitamins-minerals" className="sm:flex-1 text-center">Witaminy i Minerały</TabsTrigger>
          <TabsTrigger value="omega3" className="sm:flex-1 text-center">Kwasy Omega-3</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic-info">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex w-full justify-end">
              <FavoriteInfo
                favoriteCount={product1.favoriteCount}
                id={product1.id}
              />
            </div>
            <div className="flex w-full justify-end">
              <FavoriteInfo
                favoriteCount={product2.favoriteCount}
                id={product2.id}
              />
            </div>
            <DataField label="Opis:" value={product1?.productDescription ?? placeholder} />
            <DataField label="Opis:" value={product2?.productDescription ?? placeholder} />
            <DataField label="Kod EAN:" value={product1?.ean ?? placeholder} />
            <DataField label="Kod EAN:" value={product2?.ean ?? placeholder} />
            <DataField label="Kraj pochodzenia:" value={product1?.country ?? placeholder} />
            <DataField label="Kraj pochodzenia:" value={product2?.country ?? placeholder} />
            <Card className="w-full mt-2">
              <CardHeader>
                <CardTitle className="text-center text-md">
                  Cechy Produktu {product1?.productName}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row flex-wrap">
                <ProductAllergens productDetails={product1} />
                <ProductRatings productDetails={product1} groupName="Posiadane Certyfikaty" />
                <ProductRatings productDetails={product1} groupName="Specyficzne Cechy" />
                <ProductRatings productDetails={product1} groupName="Bez dodatków do żywności" />
                <ProductRatings productDetails={product1} groupName="Zastosowane procesy technologiczne" />
                <ProductRatings productDetails={product1} groupName="Parametry bez składników" />
              </CardContent>
            </Card>
            <Card className="w-full mt-2">
              <CardHeader>
                <CardTitle className="text-center text-md">
                  Cechy produktu {product2?.productName}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row flex-wrap">
                <ProductAllergens productDetails={product2} />
                <ProductRatings productDetails={product2} groupName="Posiadane Certyfikaty" />
                <ProductRatings productDetails={product2} groupName="Specyficzne Cechy" />
                <ProductRatings productDetails={product2} groupName="Bez dodatków do żywności" />
                <ProductRatings productDetails={product2} groupName="Zastosowane procesy technologiczne" />
                <ProductRatings productDetails={product2} groupName="Parametry bez składników" />
              </CardContent>
            </Card>
            <ProductIngredientsList productDetails={product1} />
            <ProductIngredientsList productDetails={product2} />
          </div>
        </TabsContent>

        {/* Nutritional Information */}
        <TabsContent value="nutritional-info">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex-1 min-w-full">
              <NutritionalChart productDetails={product1} />
              <MacronutrientsInformation productDetails={product1} />
              <FatSaturationChart productDetails={product1} />
              <SugarContentChart productDetails={product1} />
            </div>
            <div className="flex-1 min-w-full">
              <NutritionalChart productDetails={product2} />
              <MacronutrientsInformation productDetails={product2} />
              <FatSaturationChart productDetails={product2} />
              <SugarContentChart productDetails={product2} />
            </div>
          </div>
        </TabsContent>

        {/* Vitamins and Minerals */}
        <TabsContent value="vitamins-minerals">
          <div className="flex flex-wrap gap-4">
            <VitaminsInformation productDetails={product1} />
            <VitaminsInformation productDetails={product2} />
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <MineralsInformation productDetails={product1} />
            <MineralsInformation productDetails={product2} />
          </div>
        </TabsContent>

        {/* Omega-3 */}
        <TabsContent value="omega3">
          <div className="grid grid-cols-2 gap-4">
            <Omega3Table productDetails={product1} />
            <Omega3Table productDetails={product2} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductComparison;