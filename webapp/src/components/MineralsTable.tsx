import { ProductDetails } from "@/types/ProductDetails";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface MineralsTableProps {
  productDetails: ProductDetails;
}

const MineralsTable: React.FC<MineralsTableProps> = ({ productDetails }) => {
  const mineralNames = [
    "Potas",
    "Wapń",
    "Fosfor",
    "Magnez",
    "Żelazo",
    "Cynk",
    "Fluorek",
    "Mangan",
    "Miedź",
    "Jod",
    "Selen",
    "Molibden",
    "Chrom",
  ];

  const getMineralValue = (mineralName: string) => {
    // Szukamy minerału w tablicy 'nutritionalValues'
    const mineral = productDetails.nutritionalValues.find(
      (item) => item.nutritionalValueName.name === mineralName
    );
    return mineral
      ? {
          quantity: mineral.quantity,
          unit: mineral.unit.name,
        }
      : { quantity: "Brak danych", unit: "" };
  };

  // Przekształcamy dane na format tabeli
  const mineralsData = mineralNames.map((mineralName) => {
    const { quantity, unit } = getMineralValue(mineralName);
    return { name: mineralName, quantity, unit };
  });

  return (
    <Card className="flex-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mineral</TableHead>
            <TableHead>Ilość</TableHead>
            <TableHead>Jednostka</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mineralsData.map((mineral, index) => (
            <TableRow
              key={index}
              className={`${
                mineral.quantity !== "Brak danych" && mineral.quantity !== 0
                  ? "bg-green-100"
                  : ""
              }`}
            >
              <TableCell>{mineral.name}</TableCell>
              <TableCell>{mineral.quantity}</TableCell>
              <TableCell>{mineral.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MineralsTable;
