type Allergen = {
  id: string;
  name: string;
};

type Producer = {
  id: string;
  name: string;
  address: string;
  countryCode: number;
  NIP: string;
  RMSD: number;
  contact: string;
};

type Unit = {
  id: string;
  name: string;
};

type PackageType = {
  id: string;
  name: string;
};

type Addition = {
  id: string;
  addition_number: number;
};

type Composition = {
  id: string;
  ingredients: Array<{ id: string; name: string }>;
  additions: Addition[];
  flavour: string | null;
};

type NutritionalIndex = {
  id: string;
  indexValue: number | null;
  legend: string | null;
};

type ProductIndex = {
  id: string;
  version: number;
  indexName: string;
  indexValue: number;
};

type Label = {
  id: string;
  allergens: Allergen[];
  storage: string;
  durability: string | null;
  instructionsAfterOpening: string | null;
  preparation: string | null;
  image: string;
};

type Portion = {
  id: string;
  portionQuantity: number;
  unit: Unit;
};

type Rating = {
  id: string;
  groupName: string;
  name: string;
};

type NutritionalValue = {
  id: string;
  nutritionalValueName: {
    id: string;
    group: {
      id: string;
      groupName: string;
    };
    name: string;
  };
  quantity: number;
  unit: Unit;
  nrv: number;
};

export type ProductDetails = {
  ean: string;
  productName: string;
  productDescription: string;
  productQuantity: number;
  country: string;
  producer: Producer;
  unit: Unit;
  packageType: PackageType;
  composition: Composition;
  nutritionalIndexes: NutritionalIndex[];
  productIndexes: ProductIndex[];
  label: Label;
  portion: Portion;
  ratings: Rating[];
  nutritionalValues: NutritionalValue[];
};
