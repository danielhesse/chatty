import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IRequest {
  email: string;
}

export class UsersService {
  private usersRepository = UsersRepository;

  async create({ email }: IRequest) {
    const userAlreadyExists = await this.usersRepository.findOne({
      where: {
        email
      }
    });

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const user = this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
