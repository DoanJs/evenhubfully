import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FCMToken } from 'src/fcmtokens/FCMToken.model';
import { User, UsersService } from '.';
import { EventFollowerInput } from './type/event_follower.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.users();
  }

  @Query(() => User)
  getUserId(@Args('userId') userId: number): Promise<User> {
    return this.usersService.getUserId(userId);
  }

  @Query(() => User)
  user(@Args('email') email: string): Promise<User> {
    return this.usersService.user(email);
  }

  @Mutation((returns) => String)
  editEventFollower(
    @Args('eventFollowerInput')
    eventFollowerInput: EventFollowerInput,
  ): Promise<String> {
    return this.usersService.editEventFollower(eventFollowerInput);
  }

  // relation

  @ResolveField((returns) => [Event])
  user_followers(@Parent() user: User): Promise<Event[]> {
    return this.usersService.user_followers(user.UserID);
  }

  @ResolveField((returns) => [FCMToken])
  fcmTokens(@Parent() user: User): Promise<FCMToken[]> {
    return this.usersService.fcmTokens(user.UserID);
  }

  @ResolveField((returns) => [User])
  followings(@Parent() user: User): Promise<User[]> {
    return this.usersService.followings(user.UserID);
  }
}
