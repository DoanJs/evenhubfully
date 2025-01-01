import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from './Follower.model';
import { FollowerInput } from './types/Follower.input';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private followerRepository: Repository<Follower>,
  ) {}

  followers(): Promise<Follower[]> {
    return this.followerRepository.query('select * from Followers');
  }

  // relation

  async editFollower({
    type,
    followerInput,
  }: {
    type: string;
    followerInput: FollowerInput;
  }): Promise<string> {
    const { userId, friendId } = followerInput;
    try {
      if (type === 'delete') {
        await this.followerRepository.query(`
      delete from Followers where userId = ${userId} and friendId =${friendId}
      `);
      } else {
        await this.followerRepository.query(`
      insert into Followers (userId, friendId) values (${userId}, ${friendId})
      `);
      }

      return type === 'insert'
        ? 'Update follower completed !'
        : 'Delete follower completed !';
    } catch (error) {
      throw new UnauthorizedException('Delete/update follower error !');
    }
  }
}
