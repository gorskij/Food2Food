import { FC } from "react";
import DataField from "@/components/DataField";
import FatSaturationChart from "@/components/FatSaturationChart";
import MineralsInformation from "@/components/MineralsInformation";
import NutritionalChart from "@/components/NutritionalChart";
import Omega3Information from "@/components/Omega3Information";
import ProductAllergens from "@/components/ProductAllergens";
import ProductIngredientsList from "@/components/ProductIngredientsList";
import MacronutrientsInformation from "@/components/MacronutrientsInformation";
import SugarContentChart from "@/components/SugarContentChart";
import VitaminsInformation from "@/components/VitaminsInformation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductDetails } from "@/types/ProductDetails";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ProductRatings from "./ProductRatings";
import FavoriteInfo from "./FavoriteInfo";
import { useTranslation } from "react-i18next";
import { UserPreference } from "@/types/UserPreference";
import FavoriteCountComparison from "./FavoriteCountComparison";
import PackageTypeComparison from "./PackageTypeComparison";
import { useUserStore } from "@/store/userStore";
import MacronutrientsComparison from "./MacronutrientsComparison";
import { Banana, Carrot } from "lucide-react";

interface ProductComparisonProps {
  product1: ProductDetails | undefined;
  product2: ProductDetails | undefined;
  userPreference?: UserPreference | undefined;
}

const ProductComparison: FC<ProductComparisonProps> = ({
  product1,
  product2,
  userPreference,
}) => {
  const { t } = useTranslation();
  const noDataInfo = t("base.noData");
  const { isAuthenticated } = useUserStore();
  if (!product1 || !product2) return <></>;

  return (
    <div className="flex flex-col min-w-full">
      <Tabs defaultValue="basic-info">
        <TabsList className="flex justify-start flex-wrap h-auto w-fit">
          <TabsTrigger value="basic-info" className="sm:flex-1 text-center">
            {t("productComparison.basicInfo")}
          </TabsTrigger>
          <TabsTrigger value="macronutrients" className="sm:flex-1 text-center">
            {t("productComparison.macronutrients")}
          </TabsTrigger>
          <TabsTrigger value="nutrients" className="sm:flex-1 text-center">
            {t("productComparison.nutrients")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
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
            <FavoriteCountComparison
              product1FavoriteCount={product1.favoriteCount}
              product2FavoriteCount={product2.favoriteCount}
            />
            <DataField
              label={t("productComparison.productDescription")}
              value={product1?.productDescription ?? noDataInfo}
            />
            <DataField
              label={t("productComparison.productDescription")}
              value={product2?.productDescription ?? noDataInfo}
            />
            <DataField
              label={t("productComparison.ean")}
              value={product1?.ean ?? noDataInfo}
            />
            <DataField
              label={t("productComparison.ean")}
              value={product2?.ean ?? noDataInfo}
            />
            <DataField
              label={t("productComparison.countryOfOrigin")}
              value={product1?.country ?? noDataInfo}
            />
            <DataField
              label={t("productComparison.countryOfOrigin")}
              value={product2?.country ?? noDataInfo}
            />
            <DataField
              label={t("productComparison.packageType")}
              value={
                product1?.packageType?.name
                  ? t(`packageTypes.${product1.packageType.name}`)
                  : noDataInfo
              }
            />
            <DataField
              label={t("productComparison.packageType")}
              value={
                product2?.packageType?.name
                  ? t(`packageTypes.${product2.packageType.name}`)
                  : noDataInfo
              }
            />

            {userPreference && isAuthenticated() && (
              <PackageTypeComparison
                product1PackageType={product1.packageType}
                product2PackageType={product2.packageType}
                userPreference={userPreference}
              />
            )}

            <Card className="w-full mt-2">
              <CardHeader>
                <CardTitle className="text-center text-md flex flex-row items-center justify-center gap-2">
                  <div>
                    {t("productComparison.productCharacteristicsTitle")}
                  </div>
                  <Banana />
                </CardTitle>
                <CardDescription className="text-center text-pretty mx-2">
                  {t("productComparison.productCharacteristicsDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row flex-wrap">
                <ProductAllergens
                  productDetails={product1}
                  userPreference={userPreference}
                />
                <ProductRatings
                  productDetails={product1}
                  userPreference={userPreference}
                  groupName="Posiadane Certyfikaty"
                />
                <ProductRatings
                  productDetails={product1}
                  userPreference={userPreference}
                  groupName="Specyficzne Cechy"
                />
                <ProductRatings
                  productDetails={product1}
                  userPreference={userPreference}
                  groupName="Bez dodatków do żywności"
                />
                <ProductRatings
                  productDetails={product1}
                  userPreference={userPreference}
                  groupName="Zastosowane procesy technologiczne"
                />
                <ProductRatings
                  productDetails={product1}
                  userPreference={userPreference}
                  groupName="Parametry bez składników"
                />
              </CardContent>
            </Card>
            <Card className="w-full mt-2">
              <CardHeader>
                <CardTitle className="text-center text-md flex flex-row items-center justify-center gap-2">
                  <div>
                    {t("productComparison.productCharacteristicsTitle")}
                  </div>
                  <Carrot />
                </CardTitle>
                <CardDescription className="text-center text-pretty mx-2">
                  {t("productComparison.productCharacteristicsDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-start flex-wrap">
                <ProductAllergens
                  productDetails={product2}
                  userPreference={userPreference}
                />
                <ProductRatings
                  productDetails={product2}
                  userPreference={userPreference}
                  groupName="Posiadane Certyfikaty"
                />
                <ProductRatings
                  productDetails={product2}
                  userPreference={userPreference}
                  groupName="Specyficzne Cechy"
                />
                <ProductRatings
                  productDetails={product2}
                  userPreference={userPreference}
                  groupName="Bez dodatków do żywności"
                />
                <ProductRatings
                  productDetails={product2}
                  userPreference={userPreference}
                  groupName="Zastosowane procesy technologiczne"
                />
                <ProductRatings
                  productDetails={product2}
                  userPreference={userPreference}
                  groupName="Parametry bez składników"
                />
              </CardContent>
            </Card>
            <ProductIngredientsList productDetails={product1} icon="banana" />
            <ProductIngredientsList productDetails={product2} icon="carrot" />
          </div>
        </TabsContent>

        <TabsContent value="macronutrients">
          <div className="flex flex-wrap gap-4">
            <NutritionalChart productDetails={product1} icon="banana" />
            <NutritionalChart productDetails={product2} icon="carrot" />
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <MacronutrientsInformation
              productDetails={product1}
              icon="banana"
            />
            <MacronutrientsInformation
              productDetails={product2}
              icon="carrot"
            />
          </div>
          <MacronutrientsComparison
            product1={product1}
            product2={product2}
            userPreference={userPreference}
          />
          <div className="flex flex-wrap gap-4 mt-4">
            <FatSaturationChart productDetails={product1} icon="banana" />
            <FatSaturationChart productDetails={product2} icon="carrot" />
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <SugarContentChart productDetails={product1} icon="banana" />
            <SugarContentChart productDetails={product2} icon="carrot" />
          </div>
        </TabsContent>

        <TabsContent value="nutrients">
          <div className="flex flex-wrap gap-4">
            <VitaminsInformation productDetails={product1} icon="banana" />
            <VitaminsInformation productDetails={product2} icon="carrot" />
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <MineralsInformation productDetails={product1} icon="banana" />
            <MineralsInformation productDetails={product2} icon="carrot" />
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Omega3Information productDetails={product1} icon="banana" />
            <Omega3Information productDetails={product2} icon="carrot" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductComparison;
