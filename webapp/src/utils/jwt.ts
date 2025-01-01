import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  username: string;
  id: string;
  authorities: string[];
};

export const decodeJwt = (token: string) => {
  if (!token || token.trim() === "" || token.split(".").length !== 3) {
    return null;
  }
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenValid = (token: string): boolean => {
  const payload = decodeJwt(token);
  return payload !== null && Date.now() < payload.exp * 1000;
};
