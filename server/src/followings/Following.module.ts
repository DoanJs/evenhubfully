import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Following } from './Following.model';
import { FollowingsResolver } from './Followings.resolver';
import { FollowingsService } from './Followings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Following]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [FollowingsResolver, FollowingsService],
  exports: [],
})
export class FollowingModule {}
