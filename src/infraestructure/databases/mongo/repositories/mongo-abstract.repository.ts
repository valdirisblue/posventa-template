import { Model, Document } from 'mongoose';
import { BaseRepository } from '../../../../domain/interfaces/repositories/base.repository';

export abstract class MongoRepository<T extends Document>
  implements BaseRepository<T, any>
{
  constructor(private readonly model: Model<T>) {}

  async create(entity: Partial<T>): Promise<T> {
    const createdEntity = new this.model(entity);
    return await createdEntity.save();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    return await this.model
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
