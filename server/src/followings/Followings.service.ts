import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Following } from './Following.model';
import { FollowingInput } from './types/Following.input';

@Injectable()
export class FollowingsService {
  constructor(
    @InjectRepository(Following)
    private followingRepository: Repository<Following>,
  ) {}

  followings(): Promise<Following[]> {
    return this.followingRepository.query('select * from Followings');
  }

  // relation

  async editFollowing({
    type,
    followingInput,
  }: {
    type: string;
    followingInput: FollowingInput;
  }): Promise<string> {
    const { userId, friendId } = followingInput;
    try {
      if (type === 'delete') {
        await this.followingRepository.query(`
      delete from Followings where userId = ${userId} and friendId =${friendId}
      `);
        await this.followingRepository.query(`
      delete from Followers where userId = ${friendId} and friendId =${userId}
      `);
      } else {
        await this.followingRepository.query(`
      insert into Followings (userId, friendId) values (${userId}, ${friendId})
      `);
        await this.followingRepository.query(`
      insert into Followers (userId, friendId) values (${friendId}, ${userId})
      `);
      }

      return type === 'insert'
        ? 'Update following/follower completed !'
        : 'Delete following/follower completed !';
    } catch (error) {
      throw new UnauthorizedException('Delete/update following/follower error !');
    }
  }
}
