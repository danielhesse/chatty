import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface IRequest {
  username: string;
  chat: boolean;
}

export class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ username, chat }: IRequest) {
    const userAlreadyExists = await this.settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error("This user already has a setting!");
    }

    const setting = this.settingsRepository.create({
      username,
      chat,
    });

    await this.settingsRepository.save(setting);

    return setting;
  }

  async searchByUsername(username: string) {
    const setting = await this.settingsRepository.findOne({ username });

    return setting;
  }

  async update(username: string, chat: boolean) {
    const checkSettingExistence = await this.settingsRepository.findOne({
      username
    });

    if (!checkSettingExistence) {
      throw new Error("This setting does not exists!");
    }

    const setting = await this.settingsRepository.createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", {
        username
      })
      .execute();

    return setting;
  }
}
