import { User } from "../models/user.model";

export interface getUsers {
  total: number,
  users: User[]
}