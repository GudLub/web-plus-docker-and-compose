import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishService } from 'src/wish/wish.service'; 
import { User } from 'src/user/entities/user.entity'; 

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishService: WishService,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User) {
    const wishes = await this.wishService.findOne(createOfferDto.itemId);
    const wish = await this.wishService.findOne(wishes.id);
    const resultSum = wish.price - wish.raised;
    const rise = Number(wish.raised) + Number(createOfferDto.amount);

    if (wish.owner.id === user.id) {
      throw new ForbiddenException('You cannot get money for your wishes');
    }
    if (createOfferDto.amount > wish.price) {
      throw new ForbiddenException('Sum is too large');
    }

    if (createOfferDto.amount > resultSum) {
      throw new ForbiddenException(
        'Sum is greater than the amount remaining to collect the wish',
      );
    }

    if (wish.raised === wish.price) {
      throw new ForbiddenException('Sum already collected');
    }

    await this.wishService.updateRise(createOfferDto.itemId, rise);
    const offerDto = { ...createOfferDto, user: user, item: wish };
    return await this.offerRepository.save(offerDto);
  }

  findAll(): Promise<Offer[]> {
    try {
      return this.offerRepository.find({
        relations: {
          item: {
            owner: true,
            offers: true,
          },
          user: {
            wishes: true,
            wishlists: true,
            offers: true,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOneBy({ id });
    if (!offer) {
      throw new NotFoundException(`Offer with this ${id} not found`);
    }
    return offer;
  }
}
