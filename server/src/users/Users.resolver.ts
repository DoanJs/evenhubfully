import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FCMToken } from 'src/fcmtokens/FCMToken.model';
import { FollowEventInput } from './type/followEvent.input';
import { User } from './User.model';
import { UsersService } from './User.service';
import { UserInput } from './type/user.input';
import { UserCategoryInput } from './type/userCategory.input';
import { Category } from 'src/categories/Category.model';

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

  @Mutation(() => User)
  editUser(
    @Args('userId') userId: number,
    @Args('userInput') userInput: UserInput,
  ): Promise<User> {
    return this.usersService.editUser({ userInput, userId });
  }

  @Mutation(() => String)
  editFollowEvent(
    @Args('type') type: string,
    @Args('followEventInput') followEventInput: FollowEventInput,
  ): Promise<string> {
    return this.usersService.editFollowEvent({ followEventInput, type });
  }

  @Mutation(() => String)
  editInterests(
    @Args('userId') userId: number,
    @Args('interests', { type: () => [UserCategoryInput] })
    interests: [UserCategoryInput],
  ): Promise<string> {
    return this.usersService.editInterests({ interests, userId });
  }

  // relation

  @ResolveField(() => [Event])
  followEvents(@Parent() user: User): Promise<Event[]> {
    return this.usersService.followEvents(user.UserID);
  }

  @ResolveField(() => [FCMToken])
  fcmTokens(@Parent() user: User): Promise<FCMToken[]> {
    return this.usersService.fcmTokens(user.UserID);
  }

  @ResolveField(() => [User])
  followings(@Parent() user: User): Promise<User[]> {
    return this.usersService.followings(user.UserID);
  }

  @ResolveField(() => [User])
  followers(@Parent() user: User): Promise<User[]> {
    return this.usersService.followers(user.UserID);
  }

  @ResolveField(() => [Category])
  interests(@Parent() user: User): Promise<User[]> {
    return this.usersService.interests(user.UserID);
  }
}
