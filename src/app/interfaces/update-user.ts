import { User } from "../models/user.model";

export interface updateUser {
  ok: boolean,
  user: User,
  msg?: string
}