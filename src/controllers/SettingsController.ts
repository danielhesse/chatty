import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

export class SettingsController {

  async create(request: Request, response: Response) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const { username, chat } = request.body;

    const setting = settingsRepository.create({
      username,
      chat,
    });

    await settingsRepository.save(setting);

    return response.status(201).json(setting);
  }
}
