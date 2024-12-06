import { ProductDetails } from "@/types/ProductDetails";
import { FC } from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface SaltAndFiberTableProps {
  productDetails: ProductDetails;
}

const SaltAndFiberTable: FC<SaltAndFiberTableProps> = ({ productDetails }) => {
  const names = ["Sól", "Błonnik"];
  const getValue = (elementName: string) => {
    const element = productDetails.nutritionalValues.find(
      (item) => item.nutritionalValueName.name === elementName
    );
    return element
      ? {
          quantity: element.quantity,
          unit: element.unit.name,
        }
      : { quantity: "Brak danych", unit: "" };
  };

  const data = names.map((element) => {
    const { quantity, unit } = getValue(element);
    return { name: element, quantity, unit };
  });

  const getRowClass = (name: string, quantity: number | string) => {
    if (name === "Błonnik" && quantity !== "Brak danych") {
      return "bg-green-100";
    }

    if (name === "Sól" && typeof quantity === "number") {
      if (quantity <= 0.5) {
        return "bg-green-100";
      } else if (quantity > 0.5 && quantity <= 1.5) {
        return "";
      } else {
        return "bg-red-100";
      }
    }

    return "";
  };

  return (
    <Card className="flex-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>składnik</TableHead>
            <TableHead>Ilość</TableHead>
            <TableHead>Jednostka</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((element, index) => {
            const quantity = element.quantity;
            const rowClass = getRowClass(element.name, quantity);
            return (
              <TableRow key={index} className={rowClass}>
                <TableCell>{element.name}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{element.unit}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default SaltAndFiberTable;
