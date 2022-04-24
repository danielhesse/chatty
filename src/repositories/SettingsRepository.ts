import { AppDataSource } from "../database";
import { Setting } from "../entities/Setting";

export const SettingsRepository = AppDataSource.getRepository(Setting)
