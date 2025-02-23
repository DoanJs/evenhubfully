import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConversationInput {
  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  createAt: number;

  @Field({ nullable: true })
  creatorId: number;

  @Field({ nullable: true })
  deleteAt: number;

  @Field({ nullable: true })
  isGroup: number;

  @Field({ nullable: true })
  msgLast: string;

  @Field({ nullable: true })
  msgLastSenderId: number;

  @Field({ nullable: true })
  msgLastTime: string;

  @Field(() => [Number], { nullable: true })
  participantIds: number[];

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  updateAt: number;
}
