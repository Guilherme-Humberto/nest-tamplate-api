import { ExampleEntity } from '@modules/example/domain/entities/example.entity';
import { IExampleRepository } from '@modules/example/domain/repositories/example.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExampleRepository implements IExampleRepository {
  constructor(
    @InjectRepository(ExampleEntity)
    private readonly repository: Repository<ExampleEntity>,
  ) {}

  async create(data: ExampleEntity): Promise<ExampleEntity> {
    const response = this.repository.create(data);
    await this.repository.save(response);

    return response;
  }
  async update(data: ExampleEntity): Promise<ExampleEntity> {
    await this.repository.save(data);
    return data;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findAll(): Promise<ExampleEntity[]> {
    return await this.repository.find();
  }

  async findOneExample(where: object): Promise<ExampleEntity> {
    return await this.repository.finOne({ where });
  }
}
