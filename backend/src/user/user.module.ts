import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service'; 
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import cacheConfig from 'src/config/cache.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register(cacheConfig),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule {};