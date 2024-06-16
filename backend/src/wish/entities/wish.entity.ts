import {
    IsNotEmpty,
    IsDecimal,
    IsNumber,
    IsString,
    IsUrl,
    Length,
  } from 'class-validator';
  import { Offer } from 'src/offers/entities/offer.entity';
  import { User } from 'src/user/entities/user.entity'; 
  import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
  import { BaseEntity } from 'src/utils/baseEntity';
  import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    ManyToMany
  } from 'typeorm';
  
  @Entity()
  export class Wish extends BaseEntity {
  
    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(1, 250)
    name: string;
  
    @Column()
    @IsNotEmpty()
    @IsUrl()
    link: string;
  
    @Column()
    @IsNotEmpty()
    @IsUrl()
    image: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    @IsDecimal()
    price: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    @IsDecimal()
    raised: number;
  
    @ManyToOne(() => User, (user) => user.wishes)
    @JoinColumn({ name: 'user_id' })
    owner: User;
  
    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(1, 1024)
    description: string;
  
    @OneToMany(() => Offer, (offer) => offer.item)
    offers: Offer[];

    @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
    wishlists: Wishlist[];
  
    @Column({
      type: 'numeric',
      precision: 10,
      scale: 2,
      default: 0,
    })
    @IsNumber()
    copied: number;
  
  }
