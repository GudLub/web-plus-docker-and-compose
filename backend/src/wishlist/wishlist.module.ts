import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service'; 
import { WishlistController } from './wishlist.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { wishlistsDependencies } from 'src/dependencies/wishlists'; 

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), ...wishlistsDependencies],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {}
