import { User } from "src/domain/users/entities/user.entity";

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;
