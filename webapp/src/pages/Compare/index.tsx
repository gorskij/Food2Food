import { useComparisonStore } from "@/store/comparisonStore";
import { LoadingData } from "@/components/LoadingData";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProductDetails } from "@/data/products/useProductDetails";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";
import { Scale } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import ProductComparison from "@/components/ProductComparison";
import ProductComparisonSlot from "@/components/ProductComparisonSlot";

const ComparePage: FC = () => {
  const { t } = useTranslation();
  const { product1, product2 } = useComparisonStore();

  const {
    data: product1Data,
    isLoading: isLoading1,
    isError: isError1,
  } = useGetProductDetails(product1.id);

  const {
    data: product2Data,
    isLoading: isLoading2,
    isError: isError2,
  } = useGetProductDetails(product2.id);

  const breadcrumbs = useBreadcrumbs([
    { title: t("compare.homePage"), path: "/" },
    { title: t("compare.comparePage"), path: "/compare" },
  ]);

  if (isLoading1 || isLoading2) return <LoadingData />;
  if (isError1 || isError2)
    return (
      <div>
        {t("error.loadingError")}
        <RefreshQueryButton queryKeys={["productDetails"]} />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 min-w-full">
      <div className="text-center text-3xl font-bold my-4">
        {t("compare.title")}
      </div>
      {breadcrumbs}
      <Card className="flex-1 min-w-full max-w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-center ">
            <ProductComparisonSlot product={product1} />
            <Scale className="w-12 h-12 flex-shrink-0 m-2" />
            <ProductComparisonSlot product={product2} />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {product1 && product2 ? (
            <ProductComparison
              product1={product1Data}
              product2={product2Data}
            />
          ) : (
            <div className="text-center text-lg text-gray-500">
              {t("compare.selectProducts")}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparePage;
