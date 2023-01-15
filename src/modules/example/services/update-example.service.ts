import { Inject, Injectable } from '@nestjs/common';
import { ExampleEntity } from '../domain/entities/example.entity';
import { IExampleRepository } from '../domain/repositories/example.repository';
import { UpdateExampleDto } from '../dto/update-example.dto';
import { ExampleRepository } from '../infra/repositories/typeorm/example.repository';

@Injectable()
export class UpdateExampleService {
  constructor(
    @Inject(ExampleRepository) private readonly example: IExampleRepository,
  ) {}

  public async execute(
    id: number,
    data: UpdateExampleDto,
  ): Promise<ExampleEntity> {
    const old = await this.example.findOneExample({ id });

    if (!old) throw new NotFoundException('Example no found');

    const newUser = Object.assign(old, data)

    return await this.example.update(newUser);
  }
}
