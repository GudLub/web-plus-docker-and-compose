import { Module } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Wish]), UserModule],
  controllers: [WishController],
  providers: [WishService],
  exports: [WishService],
})
export class WishModule {
  constructor(private readonly configService: ConfigService) {
    const entities = this.configService.get<string[]>('database.entities');
    if (!Array.isArray(entities) || !entities.includes(Wish.name)) {
      console.error('Import error: not found in module options');
    }
  }
}