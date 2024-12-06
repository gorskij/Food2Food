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

interface Omega3TableProps {
  productDetails: ProductDetails;
}

const Omega3Table: FC<Omega3TableProps> = ({ productDetails }) => {
  // Nazwy składników Omega-3
  const omega3Names = [
    { name: "ALA", label: "Omega-3 ALA" },
    { name: "EPA+DHA", label: "Omega-3 EPA+DHA" },
  ];

  // Funkcja, która wyszukuje wartości Omega-3
  const getOmega3Value = (omega3Name: string) => {
    const omega3 = productDetails.nutritionalValues.find(
      (item) => item.nutritionalValueName.name === omega3Name
    );
    return omega3
      ? {
          quantity: omega3.quantity,
          unit: omega3.unit.name,
        }
      : { quantity: "Brak danych", unit: "" };
  };

  // Przekształcamy dane na format tabeli
  const omega3Data = omega3Names.map((omega3) => {
    const { quantity, unit } = getOmega3Value(omega3.name);
    return { name: omega3.label, quantity, unit };
  });

  return (
    <Card className="flex-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Omega-3</TableHead>
            <TableHead>Ilość</TableHead>
            <TableHead>Jednostka</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {omega3Data.map((omega3, index) => (
            <TableRow
              key={index}
              className={`${
                omega3.quantity !== "Brak danych" && omega3.quantity !== 0
                  ? "bg-green-100"
                  : ""
              }`}
            >
              <TableCell>{omega3.name}</TableCell>
              <TableCell>{omega3.quantity}</TableCell>
              <TableCell>{omega3.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default Omega3Table;
