import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '../../categories/models/categories.model';

export interface IProducts {
  id: number;
  title: string;
  category_id: number;
  category_name: string;
  price: string;
  rating: number;
  currency_id: number;
  currency_symbol: string;
  price_with_discount?: string;
  discount?: string;
  image_url?: string;
}

@Table({ tableName: 'products' })
export class Products extends Model<Products> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Iphone 14', description: 'Product name' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: '1000', description: 'Product price' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '0' })
  price: string;

  @ApiProperty({
    example: 'https://product-image',
    description: 'Product image',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  image_url: string;

  @ApiProperty({ example: '3', description: 'Product category id' })
  @ForeignKey(() => Categories)
  @Column({ type: DataType.INTEGER, allowNull: false })
  category_id: number;

  @BelongsTo(() => Categories)
  category: Categories;
}
