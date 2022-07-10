import * as minio from 'minio';

const minioHost = process.env.MINIO_HOST as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;

const minioCLient = new minio.Client({
    endPoint: minioHost,
    port: 9000,
    useSSL: false,
    accessKey: dbUser,
    secretKey: dbPassword
})