import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
import { Readable } from 'stream';


config();

export interface User {
  id: number;
  uuid: string;
}

interface json {
  RegisteredUsers: User[];
}


const client = new S3Client({
  region: 'default',
  endpoint: process.env.LIARA_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY!,
    secretAccessKey: process.env.LIARA_SECRET_KEY!
  }
});

export const readFromDB = async (filePath: string): Promise<json | boolean> => {
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME!,
    Key: filePath
  };

  try {
    const { Body } = await client.send(new GetObjectCommand(params));
    const chunks: Uint8Array[] = [];
    for await (const chunk of Body as Readable) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const fileContents = buffer.toString('utf-8');

    // Now you can use 'fileContents' directly
    console.log('File contents:', fileContents);

    // If you want to parse JSON, you can do it like this:
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

``;

export const writeIntoDB = async (dataObject: json, fileName: string) => {
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: fileName,
    Body: JSON.stringify(dataObject)
  };

  try {
    await client.send(new PutObjectCommand(params));
    console.log(`Object written successfully to ${fileName}`);
    return true;

  } catch (error) {
    console.error('Error:', error);
  }
  return false;
};


// writeIntoDB({RegisteredUsers : []} , "TelBot/DB.json")

