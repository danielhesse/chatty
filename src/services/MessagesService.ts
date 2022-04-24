import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IRequest {
  admin_id?: string;
  user_id: string;
  sender: string;
  text: string;
}

export class MessagesService {
  private messagesRepository = MessagesRepository;

  async create({ user_id, admin_id, sender, text }: IRequest) {
    const message = this.messagesRepository.create({
      admin_id,
      user_id,
      sender,
      text,
    });

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(user_id: string) {
    const messages = await this.messagesRepository.find({
      where: { user_id },
      relations: ["user"],
    });

    return messages;
  }
}
