import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Products } from '../../products/models/products.model';

@Table({ tableName: 'categories' })
export class Categories extends Model<Categories> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Phone', description: 'Product category' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @HasMany(() => Products)
  products: Products[];
}
