import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMyProfile(userID: number) {
    try {
      let user = await this.prismaService.user.findUnique({
        where: {
          id: userID,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      const balance = await this.prismaService.transaction.aggregate({
        _sum: {
          amount: true,
        },
        _min: {
          amount: true,
        },
        _max: {
          amount: true,
        },
        // ---
        where: {
          userId: userID,
          amount : {
            gt: 0
          }
        },
      }
      )

      // const aggregations = await th.user.aggregate({
      //   _avg: {
      //     age: true,
      //   },
      // })

      return {
        data: {
          user,
          balance,
        },
      };
    } catch (error) {}
  }
}
