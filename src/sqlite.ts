import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'funny_blog_database.db',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export default config;
