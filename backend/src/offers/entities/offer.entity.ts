import { IsBoolean, IsDecimal } from 'class-validator';
import { User } from 'src/user/entities/user.entity'; 
import { BaseEntity } from 'src/utils/baseEntity';
import { Wish } from 'src/wish/entities/wish.entity'; 
import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Offer extends BaseEntity {

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsDecimal()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
