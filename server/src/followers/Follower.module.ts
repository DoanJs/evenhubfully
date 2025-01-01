import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './Follower.model';
import { FollowersResolver } from './Followers.resolver';
import { FollowersService } from './Followers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follower]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [FollowersResolver, FollowersService],
  exports: [],
})
export class FollowerModule {}
