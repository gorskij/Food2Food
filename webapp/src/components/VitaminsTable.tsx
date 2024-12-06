import { ProductDetails } from "@/types/ProductDetails";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card } from "./ui/card";

interface VitaminsTableProps {
  productDetails: ProductDetails;
}

const VitaminsTable: FC<VitaminsTableProps> = ({ productDetails }) => {
  // Lista witamin do sprawdzenia w danych
  const vitaminNames = [
    "Witamina A",
    "Witamina B1",
    "Witamina B2",
    "Witamina B3",
    "Witamina B5",
    "Witamina B6",
    "Witamina B7",
    "Witamina B9",
    "Witamina B12",
    "Witamina C",
    "Witamina D",
    "Witamina E",
    "Witamina K",
  ];

  const getVitaminValue = (vitaminName: string) => {
    const vitamin = productDetails.nutritionalValues.find(
      (item) => item.nutritionalValueName.name === vitaminName
    );
    return vitamin
      ? {
          quantity: vitamin.quantity,
          unit: vitamin.unit.name,
        }
      : { quantity: "Brak danych", unit: "" };
  };

  // Przekształcamy dane na format tabeli
  const vitaminsData = vitaminNames.map((vitaminName) => {
    const { quantity, unit } = getVitaminValue(vitaminName);
    return { name: vitaminName, quantity, unit };
  });

  return (
    <Card className="flex-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Witamina</TableHead>
            <TableHead>Ilość</TableHead>
            <TableHead>Jednostka</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vitaminsData.map((vitamin, index) => (
            <TableRow
              key={index}
              className={`${
                vitamin.quantity !== "Brak danych" && vitamin.quantity !== 0
                  ? "bg-green-100"
                  : ""
              }`}
            >
              <TableCell>{vitamin.name}</TableCell>
              <TableCell>{vitamin.quantity}</TableCell>
              <TableCell>{vitamin.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default VitaminsTable;
