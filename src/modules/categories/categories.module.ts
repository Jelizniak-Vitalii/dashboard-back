import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { AuthModule } from '../auth/auth.module';
import { Categories } from './models/categories.model';

@Module({
  providers: [CategoriesService, Logger],
  imports: [
    SequelizeModule.forFeature([Categories]),
    AuthModule
  ],
  controllers: [CategoriesController],
  exports: [CategoriesService]
})
export class CategoriesModule {}
