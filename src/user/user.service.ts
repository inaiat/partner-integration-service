import { ObjectId } from 'mongodb';
import { User, UserModel } from './user.model';
import { UserRepository } from './user.repository';

export class UserService {
  async create(
    user: UserModel,
    id: ObjectId = new ObjectId(),
  ): Promise<ObjectId> {
    const userDomain: User = {
      _id: id,
      name: user.name,
      age: user.age,
      yearOfBirth: new Date().getFullYear() - user.age,
    };
    return await this.userRepository.create(userDomain);
  }
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}