export type User = {
  id: string;
  username: string;
  email: string;
  blocked: boolean;
  roles: Role[];
};

type Role = {
  name: string;
  active: boolean;
};
