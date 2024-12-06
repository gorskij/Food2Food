import LanguageSelector from "@/components/LanguageSelector";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuthenticate } from "@/data/account/useAuthenticate";
import { useUserStore } from "@/store/userStore";
import { isTokenValid } from "@/utils/jwt";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

const getLoginSchema = (t: TFunction) =>
  z.object({
    username: z
      .string()
      .min(
        3,
        t("validation.minLength") +
          " " +
          3 +
          " " +
          t("validation.characters") +
          "."
      )
      .max(
        50,
        t("validation.maxLength") +
          " " +
          50 +
          " " +
          t("validation.characters") +
          "."
      ),
    password: z
      .string()
      .min(
        8,
        t("validation.minLength") +
          " " +
          8 +
          " " +
          t("validation.characters") +
          "."
      )
      .max(
        50,
        t("validation.maxLength") +
          " " +
          50 +
          " " +
          t("validation.characters") +
          "."
      ),
  });
type LoginSchema = z.infer<ReturnType<typeof getLoginSchema>>;

const LoginPage: FC = () => {
  const { t } = useTranslation();
  const { token, setToken } = useUserStore();
  const { authenticate, isPending } = useAuthenticate();
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(getLoginSchema(t)),
    values: {
      username: "",
      password: "",
    },
  });
  const onSubmit = form.handleSubmit(async ({ username, password }) => {
    const result = await authenticate({ username, password });
    // await authenticate({ login, password, language: i18next.language });
    setToken(result.token);
    navigate("/");
  });

  if (token && isTokenValid(token)) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="border-1 relative flex w-1/4 min-w-fit flex-col rounded-md bg-card p-7 pt-9 shadow-2xl shadow-shadowColor"
        >
          <div className="flex justify-center">
            <div className="flex-1 absolute right-14 top-1 w-fit self-end">
              <ModeToggle />
              <LanguageSelector />
            </div>
            <h1 className="w-fit text-3xl font-bold">{t("loginPage.title")}</h1>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("loginPage.username")}</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <NavLink
            to={"/reset-password-form"}
            className="self-end pb-2 text-sm text-slate-600 dark:text-slate-400"
          >
            forgot password
          </NavLink>
          <div className="flex flex-col gap-3">
            <LoadingButton
              type="submit"
              isLoading={isPending}
              // text={t("loginPage.loginButton")}
              text="loginbutton"
            />
            <Button variant="link" asChild className="w-fit self-center">
              <NavLink to={"/register"}>Register</NavLink>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
