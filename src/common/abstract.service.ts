import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbstractService {
  constructor(protected readonly respository: Repository<any>) {}

  async create(data: any): Promise<any> {
    return await this.respository.save(data);
  }

  async findOne(condition: any, relations?: string[]): Promise<any> {
    console.log('condition', condition);
    let data: any;

    if (relations) {
      data = await this.respository.findOne({
        where: condition,
        relations: relations ? relations : null,
        order: {
          createdAt: 'DESC',
        },
      });
    } else {
      data = await this.respository.findOne(condition);
    }
    return data;
  }

  async findAll(relations?: Array<string>, query?: any): Promise<any[]> {
    let data: any;

    if (relations) {
      data = await this.respository.find({
        where: query,
        order: { createdAt: 'DESC' },
        relations: relations,
      });
    } else {
      data = await this.respository.find({ order: { createdAt: 'DESC' } });
    }
    return data;
  }

  async update(id: number, data: any): Promise<any> {
    await this.respository.update(id, data);
    return await this.respository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.respository.delete(id);
  }
}
