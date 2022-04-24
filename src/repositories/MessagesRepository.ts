import { AppDataSource } from "../database";
import { Message } from "../entities/Message";

export const MessagesRepository = AppDataSource.getRepository(Message);
