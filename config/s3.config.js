const AWS_REGION=require('@aws-sdk/client-s3') || 'us-east-1';
const AWS_BUCKET_NAME = require('@aws-sdk/client-s3') || 'file-storage-bucket';

const s3Client =new s3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

module.exports = { s3Client, AWS_BUCKET_NAME };