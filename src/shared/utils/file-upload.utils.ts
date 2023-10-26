import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (file: Express.Multer.File) => {
  const fileName = uuidv4();
  const fileExtension = extname(file.originalname);

  return `${fileName}${fileExtension}`;
};
