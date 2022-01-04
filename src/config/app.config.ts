import * as mongoose from 'mongoose';
import { diContainer, Cradle } from 'fastify-awilix/lib/classic';
import { asClass, asValue, AwilixContainer } from 'awilix';
import envSchema from 'env-schema';
import { UserSchema } from '../user/user.model';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { Env, schema } from './model';

export const config = envSchema<Env>({
  schema,
})

class DbConfig {
  static async createConnection(): Promise<mongoose.Connection> {
    return mongoose.createConnection(config.DB_URL);
  }

  static async createCollection<T>(
    connection: Promise<mongoose.Connection>,
    collectionName: string,
    model: mongoose.Model<T>,
  ): Promise<mongoose.Model<T>> {
    return (await connection).model(collectionName, model.schema);
  }
}

export type DiConfig = (di: AwilixContainer<Cradle>) => void;

export const configureDi = (di: AwilixContainer<Cradle>, callback: DiConfig) => callback(di);

const defaultConfig: DiConfig = (di) => {
  const connection = DbConfig.createConnection();

  di.register({
    connection: asValue(connection),
    userCollection: asValue(
      DbConfig.createCollection(connection, 'User', UserSchema),
    ),
    userRepository: asClass(UserRepository).singleton(),
    userService: asClass(UserService).singleton(),
  });
}

export const diInit = (
  container: AwilixContainer<Cradle> = diContainer,
  config: DiConfig = defaultConfig) => configureDi(container, config);

