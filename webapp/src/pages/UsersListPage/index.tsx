import { LoadingData } from "@/components/LoadingData";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUsers } from "@/data/users/useGetUsers";
import { useBreadcrumbs } from "@/hooks/useBreacrumbs";
import {
  ChevronsLeft,
  ChevronsRight,
  Ellipsis,
  FilterX,
  RefreshCcw,
  Search,
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBlockUser } from "@/data/users/useBlockUser";
import { useUnblockUser } from "@/data/users/useUnblockUser";
import { User } from "@/types/User";
import { useQueryClient } from "@tanstack/react-query";
import { useAddAdministratorRole } from "@/data/users/useAddAdministratorRole";
import { useRemoveAdministratorRole } from "@/data/users/useRemoveAdministratorRole";

const UsersListPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchUsername, setSearchUsername] = useState("");
  const [pendingSearch, setPendingSearch] = useState("");
  const { t } = useTranslation();
  const { blockUser } = useBlockUser();
  const { unblockUser } = useUnblockUser();
  const queryClient = useQueryClient();
  const { addAdministratorRole } = useAddAdministratorRole();
  const { removeAdministratorRole } = useRemoveAdministratorRole();

  const { data, isLoading, isError, refetch } = useGetUsers({
    pageNumber: currentPage,
    pageSize: 10,
    username: searchUsername,
  });

  const handleBlockToggle = async (user: User) => {
    if (user.blocked) {
      await unblockUser(user.id);
    } else {
      await blockUser(user.id);
    }
    await refetch();
  };

  useEffect(() => {
    if (pendingSearch === "") {
      handleSearch();
    }
  }, [pendingSearch]);

  const handleSearch = () => {
    setSearchUsername(pendingSearch);
    setCurrentPage(0);
  };

  const handleClearFilters = () => {
    setPendingSearch("");
  };

  const handleAdminToggle = async (user: User) => {
    if (
      user.roles.some(
        (role) => role.name === "ADMINISTRATOR" && role.active
      )
    ) {
      await removeAdministratorRole(user.id);
    } else {
      await addAdministratorRole(user.id);
    }
    await refetch();
  };

  const handleRefreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const breadcrumbs = useBreadcrumbs([
    { title: t("usersListPage.breadcrumbs.home"), path: "/" },
    { title: t("usersListPage.breadcrumbs.list"), path: "/admin/users" },
  ]);

  if (isLoading) return <LoadingData />;
  if (isError)
    return (
      <div>
        {t("error.loadingError")}
        <RefreshQueryButton queryKeys={["users"]} />
      </div>
    );
  return (
    <div className="min-w-full">
      <div className="text-center text-3xl font-bold mt-5 mb-2">
        {t("usersListPage.title")}
      </div>
      {breadcrumbs}
      <div className="flex justify-end mr-6">
        <div className="flex w-full max-w-sm items-center mt-4">
          <Input
            type="text"
            placeholder={t("usersListPage.searchPlaceholder")}
            value={pendingSearch}
            onChange={(e) => setPendingSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button
            onClick={handleSearch}
            variant="ghost"
            size="icon"
            className="mx-1"
          >
            <Search />
          </Button>
          <Button onClick={handleClearFilters} variant="ghost" size="icon">
            <FilterX />
          </Button>
          <Button variant={"ghost"} size={"icon"} onClick={handleRefreshData}>
            <RefreshCcw />
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Button
          variant="outline"
          className="mx-6"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        >
          <ChevronsLeft />
        </Button>
        <span>
          {t("usersListPage.pageIndicator", {
            currentPage: data?.page.totalPages === 0 ? 0 : currentPage + 1,
            totalPages: data?.page.totalPages,
          })}
        </span>
        <Button
          variant="outline"
          className="mx-6"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, (data?.page.totalPages || 1) - 1)
            )
          }
        >
          <ChevronsRight />
        </Button>
      </div>
      <div className="relative mt-1 flex flex-col justify-center align-content mr-4">
        <div className="flex flex-wrap justify-center gap-4 rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("usersListPage.username")}</TableHead>
                <TableHead>{t("usersListPage.email")}</TableHead>
                <TableHead>{t("usersListPage.blocked")}</TableHead>
                <TableHead>{t("usersListPage.roles")}</TableHead>
                <TableHead className="text-right">
                  {t("usersListPage.options")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.content.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.blocked
                      ? t("usersListPage.userBlocked")
                      : t("usersListPage.userNotBlocked")}
                  </TableCell>
                  <TableCell>
                    {user.roles
                      .filter((role) => role.active)
                      .map((role) => role.name)
                      .join(", ")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="ml-auto py-2 px-4">
                          <Ellipsis />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left" className="w-auto mr-2">
                        <DropdownMenuItem
                          onClick={() => handleBlockToggle(user)}
                          className="cursor-pointer"
                        >
                          {user.blocked
                            ? t("usersListPage.unblockUser")
                            : t("usersListPage.blockUser")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAdminToggle(user)}
                          className="cursor-pointer"
                        >
                          {user.roles.some(
                            (role) =>
                              role.name === "ADMINISTRATOR" && role.active
                          )
                            ? t("usersListPage.removeAdmin")
                            : t("usersListPage.addAdmin")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UsersListPage;
