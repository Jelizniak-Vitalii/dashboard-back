import { S3 } from 'aws-sdk';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'S3',
      useFactory: () => {
        return new S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
      },
    },
  ],
  exports: ['S3'],
})
export class S3Module {}
