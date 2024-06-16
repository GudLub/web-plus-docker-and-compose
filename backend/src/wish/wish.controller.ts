import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { WishService } from './wish.service'; 
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('wishes')
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createWish(
    @Req() req,
    @Body() createWishDto: CreateWishDto,
  ): Promise<Wish> {
    try {
      const owner = req.user;
      return await this.wishService.create(owner, createWishDto);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(
    @Param('id') id: number,
    @Req() req,
  ): Promise<NonNullable<unknown>> {
    try {
      const owner = req.user;
      return await this.wishService.copyWish(id, owner);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('top')
  async getTopWishes(): Promise<Wish[]> {
    try {
      return await this.wishService.getTopWishes();
    } catch (error) {
      console.error(error);
    }
  }

  @Get('last')
  async getLastWishes(): Promise<Wish[]> {
    try {
      return await this.wishService.getLastWishes();
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async getOneWish(@Param('id') id: number): Promise<Wish> {
    try {
      return await this.wishService.findOne(id);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateOne(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<NonNullable<unknown>> {
    try {
      const userId = req.user.id;
      return await this.wishService.updateOne(id, updateWishDto, userId);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(
    @Req() req,
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    try {
      const userId = req.user.id;
      await this.wishService.remove(id, userId);
      return { message: `Card with id: ${id} delete successfully` };
    } catch (error) {
      console.error(error);
    }
  }
}
