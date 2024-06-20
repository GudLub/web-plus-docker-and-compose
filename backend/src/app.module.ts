import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistModule } from './wishlist/wishlist.module';
import { WishModule } from './wish/wish.module';
import { UserModule } from './user/user.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import config from 'config';
@Module({
  imports: [
    AuthModule,
    WishlistModule,
    WishModule,
    UserModule,
    OffersModule,
    ConfigModule.forRoot({ load: [config] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.database,
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: config().database.synchronize,
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
