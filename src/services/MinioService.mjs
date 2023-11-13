import { S3Client, PutObjectAclCommand } from '@aws-sdk/client-s3';
import AWS from '@aws-sdk/s3-request-presigner';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';
import { MINIO_ACCESS_KEY, MINIO_HOST, MINIO_SECRET_KEY } from '../commons/env.mjs';
import { BUCKET_NAME } from '../commons/constans.mjs';

const { createPresignedRequest } = AWS;

class MinioService {
  conn = null;

  constructor() {
    if (!this.conn) {
      this.conn = new S3Client({
        region: 'us-east-1',
        credentials: {
          accessKeyId: MINIO_ACCESS_KEY,
          secretAccessKey: MINIO_SECRET_KEY,
        },
        endpoint: MINIO_HOST,
        forcePathStyle: true,
      });
    }
  }

  async saveImage(image) {
    try {
      if (!image) {
        throw Boom.badRequest('Image is required');
      }
      if (!image.originalname) {
        throw Boom.badRequest('Image originalname is required');
      }
      if (!image.buffer) {
        throw Boom.badRequest('Image buffer is required');
      }

      const { originalname, buffer } = image;
      const originalNameParts = originalname.split('.');

      if (originalNameParts.length !== 2) {
        throw Boom.badRequest('Invalid image name');
      }

      const extension = originalNameParts[1];
      const fileName = `${v4()}.${extension}`;
      await this.conn.send(new PutObjectAclCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: buffer,
      }));

      return fileName;
    } catch (error) {
      throw Boom.isBoom(error) ? error : Boom.internal('Error saving image', error);
    }
  }

  async getPresignedUrl(fileName) {
    try {
      const s3Client = this.conn;

      const getObjectCommand = { Bucket: BUCKET_NAME, Key: fileName };

      const signedUrl = await
      createPresignedRequest(s3Client, getObjectCommand, { expiresIn: 86400 });

      return signedUrl;
    } catch (error) {
      throw Boom.isBoom(error) ? error : Boom.internal('Error generating signed URL', error);
    }
  }
}

export default MinioService;
