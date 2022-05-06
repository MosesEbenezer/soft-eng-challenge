import { Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Repository } from 'typeorm';
import { paginatedResult } from './paginated-result.interface';

@Injectable()
export abstract class AbstractService {
  constructor(protected readonly respository: Repository<any>) {}

  async create(data: any): Promise<any> {
    return await this.respository.save(data);
  }

  async findAll(): Promise<any[]> {
    return await this.respository.find();
  }

  async findAllWithSearch(search: any): Promise<any[]> {
    return await this.respository.find(search);
  }

  async paginate(
    page = 1,
    per_page: number,
    query?: any,
    relations?: any,
    orderBy?: any,
  ): Promise<paginatedResult> {
    const take = per_page || 15;

    const [data, total] = await this.respository.findAndCount({
      order: orderBy ?? null,
      where: query ? query : null,
      relations: relations ? relations : null,
      take,
      skip: (page - 1) * take,
    });

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async findOne(condition: any, relations?: any): Promise<any> {
    let data: any;

    if (relations) {
      data = await this.respository.findOne({
        where: {
          condition,
          relations: isArray(relations) ? relations : [`${relations}`],
          order: {
            created_at: 'DESC',
          },
        },
      });
    } else {
      data = await this.respository.findOne(condition);
    }
    return data;
  }

  async findAllV2(relations?: Array<string>, query?: any): Promise<any[]> {
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

  async findOneWithSearcch(condition: any, relations: string[]) {
    let data: any;

    if (relations) {
      data = await this.respository.findOne({
        where: {
          condition,
          relations: relations,
          order: {
            created_at: 'DESC',
          },
        },
      });
    } else {
      data = await this.respository.findOne(condition);
    }
    return data;
    // return await this.respository.findOne(condition);
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

  async markDeleted(id: number) {
    return await this.respository.softDelete({ id });
  }
}
