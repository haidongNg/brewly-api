import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    autoLoadEntities: true, // 🔥 Load tất cả entities trong các module
    synchronize: true, // 🔥 Tự động đồng bộ hóa schema (chỉ dùng trong dev)
    logging: false,
});