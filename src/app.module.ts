import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './sqlite';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as path from "path";
import { APP_GUARD } from "@nestjs/core";
import { LoginGuard } from "./login.guard";

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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env'
      // envFilePath: path.join(__dirname, '.env')
    }),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User]),
    UserModule,
    RedisModule, // 注册user模块
  ],
  controllers: [AppController],
  providers: [AppService,
    {
    provide:APP_GUARD,
    useClass:LoginGuard
    }
  ],
})
export class AppModule {}
