import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";
import { useMutateUserLanguage } from "@/data/account/useMutateUserLanguage";
import { useUserStore } from "@/store/userStore";

const LanguageSelector: FC = () => {
  const { setLanguage } = useLanguageStore();
  const { mutateUserLanguage } = useMutateUserLanguage();
  const { isAuthenticated } = useUserStore();

  const handleLanguageChange = (language: "en" | "pl") => {
    setLanguage(language);
    if (isAuthenticated()) {
      mutateUserLanguage({ language: language });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className="cursor-pointer"
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("pl")}
          className="cursor-pointer"
        >
          Polski
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
