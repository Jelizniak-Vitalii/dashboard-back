import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductsController } from './products.controller';
import { Products } from './models/products.model';
import { AuthModule } from '../auth/auth.module';
import { ProductsService } from './products.service';
import { CategoriesModule } from '../categories/categories.module';
import { Categories } from '../categories/models/categories.model';;

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    forwardRef(() => CategoriesModule),
    SequelizeModule.forFeature([Products, Categories]),
    AuthModule,
    CategoriesModule
  ],
  exports: []
})
export class ProductsModule {}
