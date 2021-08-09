import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface IRequest {
  username: string;
  chat: boolean;
}

export class SettingsService {
  async create({ username, chat }: IRequest) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const userAlreadyExists = await settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error("This user already has a setting!");
    }

    const setting = settingsRepository.create({
      username,
      chat,
    });

    await settingsRepository.save(setting);

    return setting;
  }
}
