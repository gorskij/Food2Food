import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { RefreshCcw } from "lucide-react";

type RefreshQueryButtonProps = {
  queryKeys: string[];
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

const RefreshQueryButton: FC<RefreshQueryButtonProps> = ({
  queryKeys,
  children,
  className,
  ...tags
}) => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: [...queryKeys] });
  };

  return (
    <Button
      {...tags}
      variant="ghost"
      className={cn(className, "flex gap-2 align-middle")}
      onClick={refresh}
    >
      <RefreshCcw />
      {children}
    </Button>
  );
};

export default RefreshQueryButton;
