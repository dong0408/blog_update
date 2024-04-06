import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../user/user.module";
@Global()
@Module({
  imports: [ConfigModule,UserModule],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
