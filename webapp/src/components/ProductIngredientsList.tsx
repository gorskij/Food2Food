import { ProductDetails } from "@/types/ProductDetails";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface ProductIngredientsListProps {
  productDetails: ProductDetails;
}

const ProductIngredientsList: FC<ProductIngredientsListProps> = ({
  productDetails,
}) => {
  const ingredients = productDetails.composition.ingredients.filter(
    (ingredient) => ingredient.name !== null
  );
  const additions = productDetails.composition.additions.filter(
    (addition) => addition.addition_number !== null
  );
  const noData = ingredients.length === 0 && additions.length === 0;

  return (
    <Card className="flex-1 max-w-full mt-4 min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-left">Skład</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {noData ? (
          <p>Brak dostępnych danych dotyczących składników oraz dodatków.</p>
        ) : (
          <div className="flex-1 flex-col">
            {/* Ingredients Table */}
            {ingredients.length > 0 && (
              <div className="mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Składniki</TableHead>
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

            {/* Additions Table */}
            {additions.length > 0 && (
              <div className="mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Numery Dodatków</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {additions.map((addition, index) => (
                      <TableRow key={index} className="bg-red-100">
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
