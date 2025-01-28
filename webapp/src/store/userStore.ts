import { decodeJwt, isTokenValid } from "@/utils/jwt";
import { create } from "zustand";

type UserStore = {
  token?: string;
  roles?: string[];
  id?: string;
  username?: string;
  setToken: (token: string) => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
};

export type Role = "administrator" | "user";

export const roleMapping: Record<string, string> = {
  ADMINISTRATOR: "admin",
  USER: "user",
};

const LSToken = localStorage.getItem("token");
const decodedLSToken = LSToken === null ? undefined : decodeJwt(LSToken!);

export const useUserStore = create<UserStore>((set) => ({
  token: LSToken === null ? undefined : LSToken,
  id: decodedLSToken?.id || undefined,
  roles: LSToken === null ? undefined : decodedLSToken!.authorities,
  username: decodedLSToken?.username || undefined,
  setToken: (token: string) =>
    set(() => {
      const payload = decodeJwt(token);
      if (payload === null)
        return {
          token: undefined,
          id: undefined,
          roles: undefined,
          name: undefined,
        };
      localStorage.setItem("token", token);
      return {
        token,
        id: payload.id,
        roles: payload.authorities,
        username: payload.username,
      };
    }),
  clearToken: () =>
    set(() => {
      localStorage.removeItem("token");
      return {
        token: undefined,
        id: undefined,
        roles: undefined,
        name: undefined,
      };
    }),
  isAuthenticated: (): boolean => {
    const state = useUserStore.getState();
    return state.token !== undefined && isTokenValid(state.token);
  },
}));
