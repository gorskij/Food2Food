export type NutritionalValueName = {
  id: string;
  group: NutritionalValueGroup;
  name: string;
};

type NutritionalValueGroup = {
  id: string;
  groupName: string;
};
