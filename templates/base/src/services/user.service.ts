import { UserRepository } from '../repositories/user.repository.js';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }

  async create(data: any) {
    return this.userRepository.create(data);
  }
}
