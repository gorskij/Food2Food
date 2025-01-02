import { FC } from "react";
import DataField from "@/components/DataField";
import FatSaturationChart from "@/components/FatSaturationChart";
import MineralsInformation from "@/components/MineralsInformation";
import NutritionalChart from "@/components/NutritionalChart";
import Omega3Table from "@/components/Omega3Table";
import ProductAllergens from "@/components/ProductAllergens";
import ProductIngredientsList from "@/components/ProductIngredientsList";
import SaltAndFiberTable from "@/components/SaltAndFiberTable";
import SugarContentChart from "@/components/SugarContentChart";
import VitaminsInformation from "@/components/VitaminsInformation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductDetails } from "@/types/ProductDetails";

interface ProductComparisonAccordionProps {
  product1: ProductDetails | undefined;
  product2: ProductDetails | undefined;
}

const ProductComparisonAccordion: FC<ProductComparisonAccordionProps> = ({
  product1,
  product2,
}) => {
  const placeholder = "Brak danych";

  return (
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
              value={product1?.productDescription ?? placeholder}
            />
            <DataField
              label="Opis:"
              value={product2?.productDescription ?? placeholder}
            />
            <DataField label="Kod EAN:" value={product1?.ean ?? placeholder} />
            <DataField label="Kod EAN:" value={product2?.ean ?? placeholder} />
            <DataField
              label="Kraj pochodzenia:"
              value={product1?.country ?? placeholder}
            />
            <DataField
              label="Kraj pochodzenia:"
              value={product2?.country ?? placeholder}
            />
            <ProductAllergens productDetails={product1} />
            <ProductAllergens productDetails={product2} />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Nutritional Information */}
      <AccordionItem value="item-2">
        <AccordionTrigger>Wartości Odżywcze</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex-1 min-w-full">
              <NutritionalChart productDetails={product1} />
              <SaltAndFiberTable productDetails={product1} />
              <FatSaturationChart productDetails={product1} />
              <SugarContentChart productDetails={product1} />
            </div>
            <div className="flex-1 min-w-full">
              <NutritionalChart productDetails={product2} />
              <SaltAndFiberTable productDetails={product2} />
              <FatSaturationChart productDetails={product2} />
              <SugarContentChart productDetails={product2} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Vitamins and Minerals */}
      <AccordionItem value="item-3">
        <AccordionTrigger>Witaminy i minerały</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-4">
            <VitaminsInformation productDetails={product1} />
            <VitaminsInformation productDetails={product2} />
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <MineralsInformation productDetails={product1} />
            <MineralsInformation productDetails={product2} />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Omega-3 */}
      <AccordionItem value="item-4">
        <AccordionTrigger>Kwasy Omega-3</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-4">
            <Omega3Table productDetails={product1} />
            <Omega3Table productDetails={product2} />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Ingredients */}
      <AccordionItem value="item-5">
        <AccordionTrigger>Skład</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-4">
            <ProductIngredientsList productDetails={product1} />
            <ProductIngredientsList productDetails={product2} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductComparisonAccordion;
