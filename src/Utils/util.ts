import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
import * as fs from 'fs';

config();

const clientConfig: S3ClientConfig = {
  region: 'default',
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY!,
    secretAccessKey: process.env.LIARA_SECRET_KEY!
  }
};

const client = new S3Client(clientConfig);



function writeDB(jsonObject: any, filePath: string): void {
  const jsonString = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(filePath, jsonString);
  console.log(`File ${filePath} created`);
}

function readDB(filePath: string, callback: (error: Error | null, data: any) => void): void {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      callback(err, null);
      return;
    }

    const jsonData = JSON.parse(data);
    callback(null, jsonData);
  });
}

function uploadDB(filePath: string): void {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Body: fileContent,
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: filePath
  };

  client.send(new PutObjectCommand(params), (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  });
}

export { readDB, writeDB };
