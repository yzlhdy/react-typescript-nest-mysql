import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { CategoryModule } from './logical/category/category.module';
import { ProductModule } from './logical/product/product.module';

@Module({
  imports: [UserModule, AuthModule, CategoryModule, ProductModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
