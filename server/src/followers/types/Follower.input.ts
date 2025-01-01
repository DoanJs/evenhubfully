import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FollowerInput {
  @Field({ nullable: true })
  userId?: number;

  @Field({ nullable: true })
  friendId?: number;
}
