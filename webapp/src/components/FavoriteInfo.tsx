import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart } from "lucide-react";
import { FC } from "react";

interface FavoriteInfoProps {
  favoriteCount: number;
}

const FavoriteInfo: FC<FavoriteInfoProps> = ({ favoriteCount }) => {
  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center cursor-pointer">
        <Heart className="text-red-500 mr-1" />
        <span>{favoriteCount}</span>
      </TooltipTrigger>
      <TooltipContent>
        Ten produkt został dodany {favoriteCount} razy do ulubionych!
      </TooltipContent>
    </Tooltip>
  );
};

export default FavoriteInfo;
