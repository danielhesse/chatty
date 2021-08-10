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

  async show(request: Request, response: Response) {
    const { username } = request.params;

    const settingsService = new SettingsService();

    const setting = await settingsService.searchByUsername(username);

    return response.json(setting);
  }

  async update(request: Request, response: Response) {
    try {
      const { username } = request.params;
      const { chat } = request.body;

      const settingsService = new SettingsService();

      const setting = await settingsService.update(username, chat);

      return response.json(setting);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

