import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Categories } from './models/categories.model';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories) private categoriesRepository: typeof Categories,
    private logger: Logger,
  ) {}

  async getCategoryById(id: number) {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    this.logger.log(`Categories Service getCategoryById, categoryId: ${category?.id}`);

    return category;
  }

  async createCategory(dto: CategoryDto) {
    const category = await this.categoriesRepository.create(dto);

    this.logger.log(`CategoriesService.createCategory: ${category.id}`);
    return category;
  }
}
