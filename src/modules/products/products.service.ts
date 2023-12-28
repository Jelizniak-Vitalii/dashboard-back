import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './models/products.model';
import { ProductDto } from './dto/product.dto';
import { Categories } from '../categories/models/categories.model';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products) private productsRepository: typeof Products,
    private categoriesService: CategoriesService
  ) {}

  async getAll() {
    return await this.productsRepository.findAll({
      include: [{ all: true, model: Categories, attributes: ['title'] }]
    });
  }

  async createProduct(dto: ProductDto) {
    const category = await this.categoriesService.getCategoryById(dto.category_id);
    console.log(category);
    if (!category) {
      throw new HttpException(`Category with id: ${dto.category_id}, not exist`, HttpStatus.NOT_FOUND);
    }

    const product = await this.productsRepository.create(dto);

    return product;
  }
}
