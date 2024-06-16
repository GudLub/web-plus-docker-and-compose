import { IsString, IsUrl, Length, MaxLength } from 'class-validator';
import { User } from 'src/user/entities/user.entity'; 
import { Wish } from 'src/wish/entities/wish.entity'; 
import { BaseEntity } from 'src/utils/baseEntity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Wishlist extends BaseEntity{

  @Column()
  @IsString()
  @Length(1, 250)
  name: string;

  @Column()
  @IsString()
  @MaxLength(1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @ManyToMany(() => Wish, (wish) => wish.name)
  @JoinTable()
  items: Wish[];
}
