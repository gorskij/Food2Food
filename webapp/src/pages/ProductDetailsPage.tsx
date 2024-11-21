import DataField from "@/components/DataField";
import { LoadingData } from "@/components/LoadingData";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProductDetails } from "@/data/products/useProductDetails";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";
import { FC } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductDetails(id!);
  const placeholderImg = "https://via.placeholder.com/150";

  const breadcrumbs = useBreadcrumbs([
    { title: "Strona Główna", path: "/" },
    { title: "Lista Produktów", path: "/products" },
    { title: data?.data.productName ?? "", path: `/products/${id}` },
  ]);

  if (isLoading) return <LoadingData />;
  if (isError)
    return (
      <div>
        Wystąpił błąd przy wczytywaniu danych.
        <RefreshQueryButton queryKeys={["products"]} />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 max-w-max">
      {breadcrumbs}

      {data && (
        <>
          <Card className="mt-2">
            <CardHeader>
              <CardTitle className="text-center">
                {data.data.productName}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="grid w-2/3 grid-cols-2 gap-2">
                <DataField label="EAN" value={data.data.ean} />
                <DataField label="Opis" value={data.data.productDescription} />
                <DataField
                  label="Ilość"
                  value={`${data.data.productQuantity.toString()} ${
                    data.data.unit.name
                  }`}
                />

                <DataField label="Kraj" value={data.data.country} />
                <DataField
                  label="Typ Opakowania"
                  value={data.data.packageType.name}
                />

                <p className="col-span-2 text-xl font-semibold">Producent</p>
                <DataField label="Nazwa" value={data.data.producer.name} />
                <DataField label="Adres" value={data.data.producer.address} />
                <DataField label="NIP" value={data.data.producer.NIP} />
                <DataField label="Kontakt" value={data.data.producer.contact} />

                <p className="col-span-2 text-xl font-semibold">
                  Wartości odżywcze
                </p>
                {(() => {
                  const displayedLabels = new Set<string>();
                  return data.data.nutritionalValues.map((nv) => {
                    const uniqueLabel = `${nv.nutritionalValueName.group.groupName} : ${nv.nutritionalValueName.name}`;
                    if (!displayedLabels.has(uniqueLabel)) {
                      displayedLabels.add(uniqueLabel);
                      return (
                        <DataField
                          key={nv.id}
                          label={uniqueLabel}
                          value={`${nv.quantity} ${nv.unit.name}`}
                        />
                      );
                    }
                    return null;
                  });
                })()}

                <p className="col-span-2 text-xl font-semibold">Skład</p>
                {data.data.composition.ingredients.map((ingredient) => (
                  <DataField
                    key={ingredient.id}
                    label="Składnik"
                    value={ingredient.name}
                  />
                ))}

                <p className="col-span-2 text-xl font-semibold">Etykieta</p>
                <DataField
                  label="Przechowywanie"
                  value={data.data.label.storage}
                />
                <DataField
                  label="Trwałość"
                  value={data.data.label.durability ?? "Brak danych"}
                />
                <DataField
                  label="Instrukcje po otwarciu"
                  value={
                    data.data.label.instructionsAfterOpening ?? "Brak danych"
                  }
                />
                <DataField
                  label="Przygotowanie"
                  value={data.data.label.preparation ?? "Brak danych"}
                />

                {/* Obrazek */}
                <div className="col-span-2 flex justify-center">
                  <img
                    src={
                      data.data.label.image
                        ? `data:image/jpeg;base64,${data.data.label.image}`
                        : placeholderImg
                    }
                    alt="Obrazek produktu"
                    className="w-40 h-40 object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="details" className="mt-4">
            <TabsList>
              <TabsTrigger value="details">Szczegóły</TabsTrigger>
              <TabsTrigger value="ratings">Parametry</TabsTrigger>
              <TabsTrigger value="indexes">Indeksy</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-center">
                    Informacje o Produkcie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DataField
                    label="Flavour"
                    value={
                      data.data.composition.flavour ?? "Brak dodatków smakowych"
                    }
                  />
                  {data.data.label.allergens.length > 0 ? (
                    <div>
                      <p className="font-semibold">Alergeny:</p>
                      {data.data.label.allergens.map((allergen) => (
                        <span key={allergen.id}>{allergen.name}, </span>
                      ))}
                    </div>
                  ) : (
                    <DataField label="Alergeny" value="Brak alergenów" />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ratings">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-center">Parametry</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.data.ratings.map((rating) => (
                    <DataField
                      key={rating.id}
                      label={rating.groupName}
                      value={rating.name}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="indexes">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-center">Indeksy</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.data.productIndexes.map((index) => (
                    <DataField
                      key={index.id}
                      label={index.indexName}
                      value={index.indexValue.toString()}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPage;
