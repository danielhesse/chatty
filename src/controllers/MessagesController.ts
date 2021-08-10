import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

export class MessagesController {
  async create(request: Request, response: Response) {
    try {
      const { admin_id, user_id, sender, text } = request.body;

      const messagesService = new MessagesService();

      const message = await messagesService.create({
        admin_id,
        user_id,
        sender,
        text,
      });

      return response.json(message);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async show(request: Request, response: Response) {
    const { user_id } = request.params;

    const messagesService = new MessagesService();

    const messages = await messagesService.listByUser(user_id);

    return response.json(messages);
  }
}
