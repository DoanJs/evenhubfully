import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FollowingInput {
  @Field({ nullable: true })
  userId?: number;

  @Field({ nullable: true })
  friendId?: number;
}
