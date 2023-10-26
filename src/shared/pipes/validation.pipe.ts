import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    // console.log('ValidationPipe', value, metadata);
    const obj = plainToClass(metadata.metatype, value);
    console.log(obj);
    // const errors = await validate(obj);
    // console.log('errors', errors);
    // if (errors && errors.length) {

    // const messages = errors.map(
    //   (err) => {
    //     console.log('err', err);
    //     return `${err.property} - ${Object.values(err.constraints).join(', ')}`
    //   },
    // );

    // console.log('ValidationPipe', messages);
    // throw new ValidationException(messages);
    // }

    return value;
  }
}
