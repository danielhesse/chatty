import { AppDataSource } from "../database";
import { User } from "../entities/User";

export const UsersRepository = AppDataSource.getRepository(User);
