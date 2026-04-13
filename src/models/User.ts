import type Role from "./Role";

export default interface User {
  userId: string;
  userName: string;
  email: string;
  image?: string;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
  provider: string;
  userRole: Role[];
}