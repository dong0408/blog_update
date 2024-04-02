import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './sqlite';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m',
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User]),

    UserModule,
    RedisModule, // 注册user模块
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
