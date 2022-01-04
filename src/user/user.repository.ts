import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { User } from "./user.model";

export class UserRepository {
    constructor(private readonly userCollection: Promise<Model<User>>) { }

    async findAll(): Promise<User[]> {
        return (await this.userCollection).find({});
    }

    async create(user: User): Promise<ObjectId> {
        const doc = (await this.userCollection).create(user);
        return (await doc)._id;
    }

}