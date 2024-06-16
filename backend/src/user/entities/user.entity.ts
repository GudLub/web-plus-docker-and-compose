import {
    IsEmail,
    IsString,
    IsUrl,
    Length,
    MinLength,
  } from 'class-validator';
  import { Offer } from '../../offers/entities/offer.entity';
  import { Wish } from 'src/wish/entities/wish.entity'; 
  import { Wishlist } from 'src/wishlist/entities/wishlist.entity'; 
  
  import {
    Entity,
    Column,
    OneToMany,
  } from 'typeorm';
import { BaseEntity } from 'src/utils/baseEntity';
  
  @Entity()
  export class User extends BaseEntity {
  
    @Column({
      unique: true,
    })
    @Length(2, 30)
    @IsString()
    username: string;
  
    @Column({
      default: 'Пока ничего не рассказал о себе',
    })
    @Length(2, 200)
    @IsString()
    about: string;
  
    @Column({
      default: 'https://i.pravatar.cc/300',
    })
    @IsUrl()
    @IsString()
    avatar: string;
  
    @Column({
      unique: true,
    })
    @IsEmail()
    @IsString()
    email: string;
  
    @Column()
    @IsString()
    @MinLength(6)
    password: string;
  
    @OneToMany(() => Wish, (wish) => wish.owner, { onDelete: 'CASCADE' })
    wishes: Wish[];
  
    @OneToMany(() => Offer, (offer) => offer.user, { onDelete: 'CASCADE' })
    offers: Offer[];
  
    @OneToMany(() => Wishlist, (wishlist) => wishlist.owner, { onDelete: 'CASCADE' })
    wishlists: Wishlist[];
  }
