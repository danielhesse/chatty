import { AppDataSource } from "../database";
import { Connection } from "../entities/Connection";

export const ConnectionsRepository = AppDataSource.getRepository(Connection);
