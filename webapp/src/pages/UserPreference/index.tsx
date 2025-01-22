import { LoadingData } from "@/components/LoadingData";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllergens } from "@/data/allergens/useGetAllergens";
import { useGetNutritionalValueNames } from "@/data/nutritionalValueName/useGetNutritionalValueNames";
import { useGetRatings } from "@/data/ratings/useGetRatings";
import { useGetUserPreference } from "@/data/userPreference/useGetUserPreference";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";
import { NutritionalValueName } from "@/types/NutritionalValueName";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Frown, RefreshCcw, Save, Smile, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetPackageTypes } from "@/data/packageTypes/useGetPackageTypes";
import { UserPreference } from "@/types/UserPreference";
import { Allergen } from "@/types/Allergen";
import { Rating } from "@/types/Rating";
import { PackageType } from "@/types/PackageType";
import { useMutateUserPreference } from "@/data/userPreference/useMutateUserPreference";
import { UserPreferenceSimplified } from "@/types/UserPreferenceSimplified";
import { Button } from "@/components/ui/button";
import ToggleableItemList from "@/components/TogglableItemList";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UserPreferencePage: FC = () => {
  const mutation = useMutateUserPreference();
  const [selectedCategory, setSelectedCategory] = useState("allergens");
  const queryClient = useQueryClient();
  const [isChanged, setIsChanged] = useState(false);
  const {
    data: userPreferenceData,
    isLoading,
    isError,
  } = useGetUserPreference();

  const [tempPreferences, setTempPreferences] = useState<UserPreference | null>(
    null
  );

  useEffect(() => {
    if (userPreferenceData && !isChanged) {
      setTempPreferences(userPreferenceData.data);
    }
  }, [userPreferenceData, isChanged]);

  const { t } = useTranslation();
  const {
    data: allergensData,
    isLoading: isLoadingAllergens,
    isError: isErrorAllergens,
  } = useGetAllergens();
  const {
    data: nutritionalValuesData,
    isLoading: isLoadingNutritionalValues,
    isError: isErrorNutritionalValues,
  } = useGetNutritionalValueNames();
  const {
    data: ratingsData,
    isLoading: isLoadingRatings,
    isError: isErrorRatings,
  } = useGetRatings();
  const {
    data: packageTypesData,
    isLoading: isLoadingPackageTypes,
    isError: isErrorPackageTypes,
  } = useGetPackageTypes();

  const breadcrumbs = useBreadcrumbs([
    { title: t("userPreference.breadcrumbs.home"), path: "/" },
    {
      title: t("userPreference.breadcrumbs.userPreference"),
      path: "/user-preference",
    },
  ]);

  if (
    isLoading ||
    isLoadingAllergens ||
    isLoadingNutritionalValues ||
    isLoadingRatings ||
    isLoadingPackageTypes
  )
    return <LoadingData />;

  if (
    isError ||
    isErrorAllergens ||
    isErrorNutritionalValues ||
    isErrorRatings ||
    isErrorPackageTypes
  ) {
    return (
      <div>
        {t("error.loadingError")}
        <RefreshQueryButton
          queryKeys={[
            "userPreference",
            "allergens",
            "nutritionalValues",
            "ratings",
          ]}
        />
      </div>
    );
  }

  const findNutritionalValueName = (
    nutritionalValueNames: NutritionalValueName[],
    targetName: string,
    targetGroupName: string
  ): NutritionalValueName | undefined => {
    return nutritionalValueNames.find(
      (value) =>
        value.name === targetName && value.group.groupName === targetGroupName
    );
  };

  let macronutrientsArray: (NutritionalValueName | undefined)[] = [];

  if (nutritionalValuesData !== undefined) {
    macronutrientsArray = [
      findNutritionalValueName(
        nutritionalValuesData,
        "Wartość Energetyczna",
        "Wartość Energetyczna"
      ),
      findNutritionalValueName(nutritionalValuesData, "Total", "Węglowodany"),
      findNutritionalValueName(nutritionalValuesData, "Total", "Tłuszcz"),
      findNutritionalValueName(nutritionalValuesData, "Białko", "Białko"),
      findNutritionalValueName(nutritionalValuesData, "Sól", "Sól"),
      findNutritionalValueName(nutritionalValuesData, "Błonnik", "Błonnik"),
    ].filter(Boolean);
  }

  type preferenceCategoryTypes =
    | Allergen
    | Rating
    | NutritionalValueName
    | PackageType;

  const handleToggle = (
    addToCategory: keyof UserPreference,
    itemId: string,
    removeFromCategory?: keyof UserPreference
  ) => {
    if (!tempPreferences) return;

    const updatedPreferences = { ...tempPreferences };

    if (removeFromCategory) {
      (updatedPreferences[removeFromCategory] as preferenceCategoryTypes[]) =
        updatedPreferences[removeFromCategory].filter(
          (item) => item.id !== itemId
        );
    }

    const alreadyExists = (
      updatedPreferences[addToCategory] as preferenceCategoryTypes[]
    ).some((item) => item.id === itemId);

    if (!alreadyExists) {
      (updatedPreferences[addToCategory] as preferenceCategoryTypes[]).push({
        id: itemId,
      } as preferenceCategoryTypes);
    } else {
      (updatedPreferences[addToCategory] as preferenceCategoryTypes[]) =
        updatedPreferences[addToCategory].filter((item) => item.id !== itemId);
    }

    setTempPreferences(updatedPreferences);
    setIsChanged(true);
  };

  const handleSave = () => {
    if (!tempPreferences || !userPreferenceData?.headers.etag) return;

    const simplifiedPreferences: UserPreferenceSimplified = {
      allergens: tempPreferences.allergens.map((item) => item.id),
      positiveRatings: tempPreferences.positiveRatings.map((item) => item.id),
      negativeRatings: tempPreferences.negativeRatings.map((item) => item.id),
      positiveNutritionalValueNames:
        tempPreferences.positiveNutritionalValueNames.map((item) => item.id),
      negativeNutritionalValueNames:
        tempPreferences.negativeNutritionalValueNames.map((item) => item.id),
      positivePackageTypes: tempPreferences.positivePackageTypes.map(
        (item) => item.id
      ),
      negativePackageTypes: tempPreferences.negativePackageTypes.map(
        (item) => item.id
      ),
    };
    const etag = userPreferenceData.headers.etag;

    mutation.mutate(
      {
        userPreference: simplifiedPreferences,
        etag: etag.substring(1, etag.length - 1),
      },
      {
        onSuccess: () => {
          setIsChanged(false);
        },
      }
    );
  };

  const handleRefreshData = () => {
    if (userPreferenceData) {
      setIsChanged(false);
      queryClient.invalidateQueries({ queryKey: ["userPreference"] });
      setTempPreferences(userPreferenceData.data);
    }
  };

  const handleResetPreferences = () => {
    setTempPreferences({
      allergens: [],
      positiveRatings: [],
      negativeRatings: [],
      positiveNutritionalValueNames: [],
      negativeNutritionalValueNames: [],
      positivePackageTypes: [],
      negativePackageTypes: [],
    });
    setIsChanged(true);
  };

  return (
    <div className="flex flex-col gap-2 min-w-full">
      <div className="text-center text-3xl font-bold my-4">
        {t("userPreference.title")}
      </div>
      {breadcrumbs}
      <div className="flex w-full justify-end">
        <Button variant={"ghost"} size={"icon"} onClick={handleRefreshData}>
          <RefreshCcw />
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {t(`userPreference.${selectedCategory}`)}
          </CardTitle>
          <CardDescription>
            {t("userPreference.description", {
              category: t(`userPreference.${selectedCategory}`),
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-2 justify-start flex-wrap">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allergens" className="cursor-pointer">
                  {t("userPreference.allergens")}
                </SelectItem>
                <SelectItem value="macronutrients" className="cursor-pointer">
                  {t("userPreference.macronutrients")}
                </SelectItem>
                <SelectItem value="nutrients" className="cursor-pointer">
                  {t("userPreference.nutrients")}
                </SelectItem>
                <SelectItem
                  value="appliedTechnologicalProcesses"
                  className="cursor-pointer"
                >
                  {t("userPreference.appliedTechnologicalProcesses")}
                </SelectItem>
                <SelectItem
                  value="parametersWithoutIngredients"
                  className="cursor-pointer"
                >
                  {t("userPreference.parametersWithoutIngredients")}
                </SelectItem>
                <SelectItem
                  value="withoutFoodAdditives"
                  className="cursor-pointer"
                >
                  {t("userPreference.withoutFoodAdditives")}
                </SelectItem>
                <SelectItem value="certificatesHeld" className="cursor-pointer">
                  {t("userPreference.certificatesHeld")}
                </SelectItem>
                <SelectItem value="packageTypes" className="cursor-pointer">
                  {t("userPreference.packageTypes")}
                </SelectItem>
                <SelectItem value="specificFeatures" className="cursor-pointer">
                  {t("userPreference.specificFeatures")}
                </SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"} disabled={!isChanged}>
                  <Save />
                  <p className="hidden sm:block">
                    {t("userPreference.saveButton")}
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("userPreference.dialog.title")}</DialogTitle>
                  <DialogDescription>
                    {t("userPreference.dialog.description")}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button onClick={handleSave} type="submit">
                      {t("userPreference.dialog.confirm")}
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant={"outline"} onClick={handleResetPreferences}>
              <Trash />
              <p className="hidden sm:block">
                {t("userPreference.resetPreferences")}
              </p>
            </Button>
          </div>

          <div className="flex-1 gap-4">
            {selectedCategory === "allergens" &&
              allergensData &&
              tempPreferences && (
                <ToggleableItemList
                  data={allergensData}
                  negativeCategory="allergens"
                  tempPreferences={tempPreferences}
                  translationCategory="allergens"
                  onToggle={handleToggle}
                />
              )}

            {selectedCategory === "macronutrients" && (
              <div>
                <ul>
                  {macronutrientsArray.map((value) => {
                    const isPositive =
                      tempPreferences?.positiveNutritionalValueNames.some(
                        (item) => item.id === value.id
                      );
                    const isNegative =
                      tempPreferences?.negativeNutritionalValueNames.some(
                        (item) => item.id === value.id
                      );

                    return (
                      <li
                        key={value?.id}
                        className="flex items-center gap-2 my-2"
                      >
                        <ToggleGroup
                          type="single"
                          variant="outline"
                          value={
                            isNegative
                              ? "negative"
                              : isPositive
                              ? "positive"
                              : ""
                          }
                        >
                          <ToggleGroupItem
                            value="positive"
                            className="data-[state=on]:bg-positive"
                            onClick={() =>
                              handleToggle(
                                "positiveNutritionalValueNames",
                                value.id,
                                "negativeNutritionalValueNames"
                              )
                            }
                          >
                            <Smile />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="negative"
                            className="data-[state=on]:bg-negative"
                            onClick={() =>
                              handleToggle(
                                "negativeNutritionalValueNames",
                                value.id,
                                "positiveNutritionalValueNames"
                              )
                            }
                          >
                            <Frown />
                          </ToggleGroupItem>
                        </ToggleGroup>
                        {t(
                          `macronutrientsInformation.${value?.group.groupName.replace(
                            /\s+/g,
                            ""
                          )}`
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {selectedCategory === "nutrients" && (
              <div>
                <ul>
                  <h2>{t("userPreference.vitamins")}</h2>
                  {nutritionalValuesData && tempPreferences && (
                    <>
                      <ToggleableItemList
                        data={nutritionalValuesData}
                        positiveCategory="positiveNutritionalValueNames"
                        negativeCategory="negativeNutritionalValueNames"
                        tempPreferences={tempPreferences}
                        translationCategory="vitamins"
                        group="Witaminy"
                        onToggle={handleToggle}
                      />
                      <h2>{t("userPreference.minerals")}</h2>
                      <ToggleableItemList
                        data={nutritionalValuesData}
                        positiveCategory="positiveNutritionalValueNames"
                        negativeCategory="negativeNutritionalValueNames"
                        tempPreferences={tempPreferences}
                        translationCategory="minerals"
                        group="Minerały"
                        onToggle={handleToggle}
                      />
                      <h2>{t("userPreference.omega3")}</h2>
                      <ToggleableItemList
                        data={nutritionalValuesData}
                        positiveCategory="positiveNutritionalValueNames"
                        negativeCategory="negativeNutritionalValueNames"
                        tempPreferences={tempPreferences}
                        translationCategory="omega3"
                        group="Omega-3"
                        onToggle={handleToggle}
                      />
                    </>
                  )}
                </ul>
              </div>
            )}

            {selectedCategory === "appliedTechnologicalProcesses" &&
              ratingsData &&
              tempPreferences && (
                <ToggleableItemList
                  data={ratingsData}
                  positiveCategory="positiveRatings"
                  negativeCategory="negativeRatings"
                  tempPreferences={tempPreferences}
                  translationCategory="ratings"
                  group="Zastosowane procesy technologiczne"
                  onToggle={handleToggle}
                />
              )}

            {selectedCategory === "parametersWithoutIngredients" &&
              ratingsData &&
              tempPreferences && (
                <ToggleableItemList
                  data={ratingsData}
                  positiveCategory="positiveRatings"
                  negativeCategory="negativeRatings"
                  tempPreferences={tempPreferences}
                  translationCategory="ratings"
                  group="Parametry bez składników"
                  onToggle={handleToggle}
                />
              )}

            {selectedCategory === "withoutFoodAdditives" &&
              ratingsData &&
              tempPreferences && (
                <ToggleableItemList
                  data={ratingsData}
                  positiveCategory="positiveRatings"
                  negativeCategory="negativeRatings"
                  tempPreferences={tempPreferences}
                  translationCategory="ratings"
                  group="Bez dodatków do żywności"
                  onToggle={handleToggle}
                />
              )}

            {selectedCategory === "certificatesHeld" &&
              ratingsData &&
              tempPreferences && (
                <ToggleableItemList
                  data={ratingsData}
                  positiveCategory="positiveRatings"
                  negativeCategory="negativeRatings"
                  tempPreferences={tempPreferences}
                  translationCategory="ratings"
                  group="Posiadane Certyfikaty"
                  onToggle={handleToggle}
                />
              )}

            {selectedCategory === "packageTypes" &&
              packageTypesData &&
              tempPreferences && (
                <ToggleableItemList
                  data={packageTypesData}
                  positiveCategory="positivePackageTypes"
                  negativeCategory="negativePackageTypes"
                  tempPreferences={tempPreferences}
                  translationCategory="packageTypes"
                  onToggle={handleToggle}
                />
              )}

            {selectedCategory === "specificFeatures" &&
              ratingsData &&
              tempPreferences && (
                <ToggleableItemList
                  data={ratingsData}
                  positiveCategory="positiveRatings"
                  negativeCategory="negativeRatings"
                  tempPreferences={tempPreferences}
                  translationCategory="ratings"
                  group="Specyficzne cechy"
                  onToggle={handleToggle}
                />
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPreferencePage;
