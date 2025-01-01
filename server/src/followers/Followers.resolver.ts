import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Follower } from './Follower.model';
import { FollowersService } from './Followers.service';
import { FollowerInput } from './types/Follower.input';

@Resolver(() => Follower)
export class FollowersResolver {
  constructor(private followersService: FollowersService) {}

  @Query(() => [Follower])
  followers(): Promise<Follower[]> {
    return this.followersService.followers();
  }

  // relation
  @Mutation(() => String)
  editFollower(
    @Args('type') type: string,
    @Args('followerInput') followerInput: FollowerInput,
  ): Promise<string> {
    return this.followersService.editFollower({
      type,
      followerInput,
    });
  }
}
