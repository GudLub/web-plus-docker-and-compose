import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistModule } from './wishlist/wishlist.module';
import { WishModule } from './wish/wish.module';
import { UserModule } from './user/user.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    WishlistModule,
    WishModule,
    UserModule,
    OffersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: false,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
