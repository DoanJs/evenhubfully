import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Following } from './Following.model';

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
}
