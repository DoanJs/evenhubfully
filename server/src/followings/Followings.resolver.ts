import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Following } from './Following.model';
import { FollowingsService } from './Followings.service';
import { FollowingInput } from './types/Following.input';

@Resolver(() => Following)
export class FollowingsResolver {
  constructor(private followingFollowingsService: FollowingsService) {}

  @Query(() => [Following])
  followings(): Promise<Following[]> {
    return this.followingFollowingsService.followings();
  }

  // relation
  @Mutation(() => String)
  editFollowing(
    @Args('type') type: string,
    @Args('followingInput') followingInput: FollowingInput,
  ): Promise<string> {
    return this.followingFollowingsService.editFollowing({
      type,
      followingInput,
    });
  }
}
