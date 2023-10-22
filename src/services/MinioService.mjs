import { S3Client, PutObjectAclCommand } from '@aws-sdk/client-s3';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';
import { MINIO_ACCESS_KEY, MINIO_HOST, MINIO_SECRET_KEY } from '../commons/env.mjs';

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

  async saveImage(Image) {
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

      if (originalNameParts, length !== 2) {
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
}
export default MinioService;
