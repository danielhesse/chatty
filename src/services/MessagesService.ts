import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IRequest {
  admin_id?: string;
  user_id: string;
  text: string;
}

export class MessagesService {
  async create({ user_id, admin_id, text }: IRequest) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const message = messagesRepository.create({
      admin_id,
      user_id,
      text,
    });

    await messagesRepository.save(message);

    return message;
  }
}
