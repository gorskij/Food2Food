import { FC } from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { NotebookPen } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useGetAllergens } from "@/data/allergens/useGetAllergens";
import { LoadingData } from "./LoadingData";
import RefreshQueryButton from "./RefreshQueryButton";

const NutritionalProfileSheet: FC = () => {
  const { data: allergensResponse, isLoading, isError } = useGetAllergens();

  if (isLoading) return <LoadingData />;
  if (isError)
    return (
      <div>
        Wystąpił błąd przy wczytywaniu danych.
        <RefreshQueryButton queryKeys={["productDetails"]} />
      </div>
    );
  return (
    <SheetContent className="min-w-[800px] sm:w-[640px]">
      <SheetHeader>
        <SheetTitle className="flex">
          <NotebookPen className="mr-1" />
          Edytuj Swój Profil Preferencji Żywieniowych
        </SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <Separator className="my-2" />
      <Label>Zawartość soli w produktach</Label>
      <RadioGroup
        defaultValue="notImportant"
        className="flex items-center space-x-8"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="salt-low" />
          <Label htmlFor="salt-low" className="text-sm">
            Niskie
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="moderate" id="salt-moderate" />
          <Label htmlFor="salt-moderate" className="text-sm">
            Umiarkowane lub niższe
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="notImportant" id="salt-notImportant" />
          <Label htmlFor="salt-notImportant" className="text-sm">
            Nieważne
          </Label>
        </div>
      </RadioGroup>
      <Separator className="my-2" />
      <Label>Zawartość cukru w produktach</Label>
      <RadioGroup
        defaultValue="notImportant"
        className="flex items-center space-x-8"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="r1" />
          <Label className="text-sm" htmlFor="r1">
            Niskie
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="moderate" id="r2" />
          <Label className="text-sm" htmlFor="r2">
            Umiarkowane lub niższe
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="notImportant" id="r3" />
          <Label className="text-sm" htmlFor="r3">
            Nieważne
          </Label>
        </div>
      </RadioGroup>
      <Separator className="my-2" />
      <Label>Zawartość nasyconych kwasów tłuszczowych w produktach</Label>
      <RadioGroup
        defaultValue="notImportant"
        className="flex items-center space-x-8"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="r1" />
          <Label className="text-sm" htmlFor="r1">
            Niskie
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="moderate" id="r2" />
          <Label className="text-sm" htmlFor="r2">
            Umiarkowane lub niższe
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="notImportant" id="r3" />
          <Label className="text-sm" htmlFor="r3">
            Nieważne
          </Label>
        </div>
      </RadioGroup>
      <Separator className="my-2" />
      <Label>Ilość dodatków w produktach</Label>
      <RadioGroup
        defaultValue="notImportant"
        className="flex items-center space-x-8"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="r1" />
          <Label className="text-sm" htmlFor="r1">
            Brak
          </Label>
        </div>
        <div className="flex items-center ml-2 space-x-2">
          <RadioGroupItem value="moderate" id="r2" />
          <Label className="text-sm" htmlFor="r2">
            Umiarkowane (jeden lub mniej)
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="notImportant" id="r3" />
          <Label className="text-sm" htmlFor="r3">
            Nieważne
          </Label>
        </div>
      </RadioGroup>
      <Separator className="my-2" />
      <Label>Preferencja produktów wegańskich</Label>
      <RadioGroup
        defaultValue="notImportant"
        className="flex items-center space-x-8"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="r1" />
          <Label className="text-sm" htmlFor="r1">
            Wymagane produkty wegańskie
          </Label>
        </div>
        <div className="flex items-center ml-2 space-x-2">
          <RadioGroupItem value="moderate" id="r2" />
          <Label className="text-sm" htmlFor="r2">
            Preferencja produktów wegańskich
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="notImportant" id="r3" />
          <Label className="text-sm" htmlFor="r3">
            Nieważne
          </Label>
        </div>
      </RadioGroup>

      <Separator className="my-2" />
      <Label className="mb-2">Preferencje dotyczące alergenów</Label>
      {isLoading ? (
        <p>Ładowanie alergenów...</p>
      ) : isError ? (
        <p>Nie udało się załadować alergenów.</p>
      ) : (
        <ToggleGroup
          variant="outline"
          type="multiple"
          className="flex flex-wrap gap-2"
        >
          {allergensResponse?.map((allergen) => (
            <ToggleGroupItem
              key={allergen.id}
              value={allergen.id}
              aria-label={allergen.name}
              className="data-[state=on]:bg-red-100 data-[state=on]:border-red-300 data-[state=on]:text-red-700 px-3 py-2 rounded-md border text-sm font-medium transition-colors"
            >
              {allergen.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
      <Separator className="my-2" />
    </SheetContent>
  );
};

export default NutritionalProfileSheet;
