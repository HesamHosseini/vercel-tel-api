const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();
const fs = require('fs');


function writeDB(jsonObject, filePath) {
// Convert JSON data to string
  const jsonString = JSON.stringify(jsonObject, null, 2);
  fs.writeFileSync(filePath, jsonString);
  console.log(`file${filePath} created `);
}

function readFromDB(filePath, callback) {

  let data;
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


function uploadDB(filePath) {
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


module.exports = { readFromDB, writeDB };