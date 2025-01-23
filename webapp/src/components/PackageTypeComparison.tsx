import { FC } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PackageType } from "@/types/PackageType";
import { UserPreference } from "@/types/UserPreference";

interface PackageTypeComparisonProps {
  product1PackageType: PackageType;
  product2PackageType: PackageType;
  userPreference: UserPreference;
}

const PackageTypeComparison: FC<PackageTypeComparisonProps> = ({
  product1PackageType,
  product2PackageType,
  userPreference,
}) => {
  const { t } = useTranslation();
  function isPositive(packageType: PackageType) {
    return userPreference?.positivePackageTypes.some(
      (item) => item.id === packageType.id
    );
  }
  function isNegative(packageType: PackageType) {
    return userPreference?.negativePackageTypes.some(
      (item) => item.id === packageType.id
    );
  }
  if (!userPreference || !product2PackageType || !product1PackageType)
    return null;

  function renderPackageTypeStatus(packageType: PackageType) {
    if (isPositive(packageType)) {
      return (
        <>
          <Plus className="text-positive mr-1" />
          <p className="text-muted-foreground">
            {t("packageTypeComparison.positive")}
          </p>
        </>
      );
    } else if (isNegative(packageType)) {
      return (
        <>
          <Minus className="text-negative mr-1" />
          <p className="text-muted-foreground">
            {t("packageTypeComparison.negative")}
          </p>
        </>
      );
    } else {
      return <div className="flex items-center"></div>;
    }
  }

  return (
    <>
      <div className="flex flex-row flex-nowrap">
        {renderPackageTypeStatus(product1PackageType)}
      </div>

      <div className="flex flex-row flex-nowrap">
        {renderPackageTypeStatus(product2PackageType)}
      </div>
    </>
  );
};

export default PackageTypeComparison;
