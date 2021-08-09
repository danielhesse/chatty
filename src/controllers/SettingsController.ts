import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

export class SettingsController {
  async create(request: Request, response: Response) {
    try {
      const { username, chat } = request.body;

      const settingsService = new SettingsService();

      const setting = await settingsService.create({
        username,
        chat
      });

      return response.status(201).json(setting);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
