import { ProductDetails } from "@/types/ProductDetails";
import { FC } from "react";
import DataField from "./DataField";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useTranslation } from "react-i18next";

interface ProducerInfoProps {
  productDetails: ProductDetails;
}

const ProducerInfo: FC<ProducerInfoProps> = ({ productDetails }) => {
  const { t } = useTranslation();

  return (
    <Card className="flex-1 max-w-full">
      <CardHeader>
        <CardTitle className="text-left">
          {t("productDetails.producerInfo")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center flex-col">
        <DataField
          label={`${t("productDetails.producer")}:`}
          value={productDetails.producer?.name ?? t("productDetails.noData")}
          className="border-b py-1 my-1"
        />
        <DataField
          label={`${t("productDetails.address")}:`}
          value={productDetails.producer.address ?? t("productDetails.noData")}
          className="my-2"
        />
        <DataField
          label={`${t("productDetails.nip")}:`}
          value={productDetails.producer.NIP ?? t("productDetails.noData")}
          className="my-2"
        />
        <DataField
          label={`${t("productDetails.contact")}:`}
          value={productDetails.producer.contact ?? t("productDetails.noData")}
          className="my-2"
        />
      </CardContent>
    </Card>
  );
}

export default ProducerInfo;