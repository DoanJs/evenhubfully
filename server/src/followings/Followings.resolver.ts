import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Following } from './Following.model';
import { FollowingsService } from './Followings.service';

@Resolver(() => Following)
export class FollowingsResolver {
  constructor(private followingFollowingsService: FollowingsService) {}

  @Query(() => [Following])
  followings(): Promise<Following[]> {
    return this.followingFollowingsService.followings();
  }

  // relation
}
