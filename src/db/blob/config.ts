import * as minio from 'minio';

const minioHost = process.env.MINIO_HOST as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const minioPort: number = +(process.env.MINIO_PORT as string);

export const minioClient = new minio.Client({
    endPoint: minioHost,
    port: minioPort,
    useSSL: false,
    accessKey: dbUser,
    secretKey: dbPassword
})