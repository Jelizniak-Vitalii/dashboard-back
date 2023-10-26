import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  private s3: S3 = new S3();

  private getFileName(path: string) {
    const pathParts = path.split('/');
    return pathParts[pathParts.length - 1];
  }

  async uploadFileToS3(
    file: Express.Multer.File,
    bucketName: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const fileName = uuidv4();
    const fileExtension = path.extname(file.originalname);

    try {
      return await this.s3
        .upload({
          Bucket: bucketName,
          Key: `${fileName}${fileExtension}`,
          Body: file.buffer,
          ContentType: file.mimetype,
          ContentDisposition: 'inline',
        })
        .promise();
    } catch (error) {
      throw new HttpException(
        'Failed to upload file to S3',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async deleteFileFromS3(
    bucketName: string,
    fileName: string,
  ): Promise<S3.DeleteObjectOutput> {
    return await this.s3
      .deleteObject({
        Bucket: bucketName,
        Key: this.getFileName(fileName),
      })
      .promise();
  }
}
