import { Allergen } from "@/types/Allergen";
import { NutritionalValueName } from "@/types/NutritionalValueName";
import { PackageType } from "@/types/PackageType";
import { Rating } from "@/types/Rating";
import { UserPreference } from "@/types/UserPreference";
import { FC } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Frown, Smile } from "lucide-react";
import { useTranslation } from "react-i18next";

type preferenceCategoryTypesArrays =
  | Allergen[]
  | Rating[]
  | NutritionalValueName[]
  | PackageType[];

type ToggleableItemListProps = {
  data: preferenceCategoryTypesArrays;
  positiveCategory?: keyof UserPreference;
  negativeCategory: keyof UserPreference;
  tempPreferences: UserPreference;
  translationCategory: string;
  group?: string;
  onToggle: (
    addToCategory: keyof UserPreference,
    itemId: string,
    removeFromCategory?: keyof UserPreference
  ) => void;
};

function isNutritionalValueName(
  item: Allergen | Rating | NutritionalValueName | PackageType
): item is NutritionalValueName {
  return (
    "group" in item &&
    typeof (item as NutritionalValueName).group.groupName === "string"
  );
}

const ToggleableItemList: FC<ToggleableItemListProps> = ({
  data,
  positiveCategory,
  negativeCategory,
  translationCategory,
  tempPreferences,
  group,
  onToggle,
}) => {
  const { t } = useTranslation();

  const shouldFilterByGroup = data.length > 0 && "groupName" in data[0];

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2">
      {data
        .filter((item) => {
          if (isNutritionalValueName(item)) {
            return item.group.groupName === group;
          }

          if ("groupName" in item) {
            if (shouldFilterByGroup) {
              return item.groupName === group;
            }
          }

          if ((item as PackageType).id && (item as PackageType).name) {
            return true;
          }

          return true;
        })
        .map((item) => {
          const isNegative = tempPreferences?.[negativeCategory]?.some(
            (prefItem) => prefItem.id === item.id
          );

          let isPositive;

          if (positiveCategory) {
            isPositive = tempPreferences?.[positiveCategory]?.some(
              (prefItem) => prefItem.id === item.id
            );
          }

          return (
            <li key={item.id} className="flex items-center gap-2 my-2">
              <ToggleGroup
                type="single"
                variant="outline"
                value={isNegative ? "negative" : isPositive ? "positive" : ""}
              >
                {negativeCategory === "allergens" ? (
                  <ToggleGroupItem
                    value="negative"
                    className="data-[state=on]:bg-negative"
                    onClick={() => onToggle(negativeCategory, item.id)}
                  >
                    <Frown />
                  </ToggleGroupItem>
                ) : positiveCategory !== undefined ? (
                  <>
                    <ToggleGroupItem
                      value="positive"
                      className="data-[state=on]:bg-positive"
                      onClick={() =>
                        onToggle(positiveCategory, item.id, negativeCategory)
                      }
                    >
                      <Smile />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="negative"
                      className="data-[state=on]:bg-negative"
                      onClick={() =>
                        onToggle(negativeCategory, item.id, positiveCategory)
                      }
                    >
                      <Frown />
                    </ToggleGroupItem>
                  </>
                ) : (
                  <></>
                )}
              </ToggleGroup>
              {t(`${translationCategory}.${item.name}`)}
            </li>
          );
        })}
    </ul>
  );
};

export default ToggleableItemList;
