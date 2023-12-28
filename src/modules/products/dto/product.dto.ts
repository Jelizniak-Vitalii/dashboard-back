import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export interface IProducts {
  id: number;
  title: string;
  category_id: number;
  price: string;
  rating: number;
  currency_id: number;
  currency_symbol: string;
  price_with_discount?: string;
  discount?: string;
  image_url?: string;
}

export class ProductDto {
  @IsOptional()
  @Type(() => String)
  @IsNumberString()
  id: number;

  @IsString({ message: 'Product title must be in string format' })
  title: string;

  @Type(() => String)
  @IsNumberString()
  category_id: number;

  @Type(() => String)
  @IsNumberString()
  price: string;
}
