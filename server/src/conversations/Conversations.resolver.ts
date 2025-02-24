import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLGuard } from 'src/auth/GraphQL.Guard';
import { Conversation } from './Conversation.model';
import { ConversationsService } from './Conversations.service';
import { ConversationInput } from './type/conversation.input';
import { User } from 'src/users/User.model';

@Resolver(() => Conversation)
@UseGuards(GraphQLGuard)
export class ConversationsResolver {
  constructor(private conversationsService: ConversationsService) {}

  @Query(() => [Conversation])
  conversations(): Promise<Conversation[]> {
    return this.conversationsService.conversations();
  }

  @Query(() => [Conversation])
  getConversationByCreators(
    @Args('creatorId') creatorId: number,
  ): Promise<Conversation[]> {
    return this.conversationsService.getConversationByCreators(creatorId);
  }

  @Mutation(() => Conversation)
  createConversation(
    @Args('conversationInput') conversationInput: ConversationInput,
  ): Promise<Conversation> {
    return this.conversationsService.createConversation(conversationInput);
  }

  @Mutation(() => Conversation)
  deleteConversation(
    @Args('conversationId') conversationId: number,
  ): Promise<Conversation> {
    return this.conversationsService.deleteConversation(conversationId);
  }

  // // relation

  @ResolveField(() => User)
  creator(@Parent() conversation: Conversation): Promise<User> {
    return this.conversationsService.creator(conversation);
  }

  // @ResolveField(() => User)
  // reConversationer(@Parent() Conversation: Conversation): Promise<User> {
  //   return this.ConversationsService.reConversationer(Conversation);
  // }
}
