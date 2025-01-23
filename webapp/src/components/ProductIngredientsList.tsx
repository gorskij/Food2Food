import { ProductDetails } from "@/types/ProductDetails";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useTranslation } from "react-i18next";
import { Banana, Carrot } from "lucide-react";

interface ProductIngredientsListProps {
  productDetails: ProductDetails;
  icon?: string;
}

const ProductIngredientsList: FC<ProductIngredientsListProps> = ({
  productDetails,
  icon,
}) => {
  const { t } = useTranslation();

  const ingredients = productDetails.composition.ingredients.filter(
    (ingredient) => ingredient.name !== null
  );
  const additions = productDetails.composition.additions.filter(
    (addition) => addition.addition_number !== null
  );
  const noData = ingredients.length === 0 && additions.length === 0;

  return (
    <Card className="flex-1 max-w-full mt-4">
      <CardHeader>
        <CardTitle className="text-center text-md flex flex-row items-center justify-center gap-2">
          {t("ingredients.title")}
          {icon === "banana" && <Banana />}
          {icon === "carrot" && <Carrot />}
        </CardTitle>
        <CardDescription className="text-center">
          {t("ingredients.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {noData ? (
          <p>{t("ingredients.noData")}</p>
        ) : (
          <div className="flex-1 flex-col">
            {ingredients.length > 0 && (
              <div className="mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {t("ingredients.ingredientsHeader")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ingredients.map((ingredient, index) => (
                      <TableRow key={index}>
                        <TableCell>{ingredient.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {additions.length > 0 && (
              <div className="mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("ingredients.additionsHeader")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {additions.map((addition, index) => (
                      <TableRow key={index}>
                        <TableCell>{addition.addition_number}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductIngredientsList;
