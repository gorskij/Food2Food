import { decodeJwt, isTokenValid } from "@/utils/jwt";
import { create } from "zustand";

type UserStore = {
  token?: string;
  id?: string;
  username?: string;
  setToken: (token: string) => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
};

const LSToken = localStorage.getItem("token");

const decodedLSToken = LSToken === null ? undefined : decodeJwt(LSToken!);

export const useUserStore = create<UserStore>((set) => ({
  token: LSToken === null ? undefined : LSToken,
  id: decodedLSToken?.id || undefined,
  username: decodedLSToken?.username || undefined,
  setToken: (token: string) =>
    set(() => {
      const payload = decodeJwt(token);
      localStorage.setItem("token", token);
      return {
        token,
        id: payload.id,
        username: payload.username,
      };
    }),
  clearToken: () =>
    set(() => {
      localStorage.removeItem("token");
      return {
        token: undefined,
        id: undefined,
        name: undefined,
      };
    }),
  isAuthenticated: (): boolean => {
    const state = useUserStore.getState();
    return state.token !== undefined && isTokenValid(state.token);
  },
}));
