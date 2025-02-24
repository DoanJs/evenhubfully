import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { User } from 'src/users/User.model';
import { Repository } from 'typeorm';
import { Conversation } from './Conversation.model';
import { ConversationInput } from './type/conversation.input';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    private dataloaderService: DataLoaderService,
  ) {}

  async conversations(): Promise<Conversation[]> {
    return this.conversationRepository.query(`select * from Conversations `);
  }

  async getConversationByCreators(creatorId: number): Promise<Conversation[]> {
    return this.conversationRepository.query(
      `select * from Conversations where creatorId = ${creatorId}`,
    );
  }

  async createConversation(
    conversationInput: ConversationInput,
  ): Promise<Conversation> {
    const {isGroup, title, avatar, creatorId, participantIds} = conversationInput

    const conversation = await this.conversationRepository.query(
      `select * from Conversations where title = '${title}' and creatorId = ${creatorId}`,
    );

    if (!conversation || (conversation && conversation.length === 0)) {
      const resultLoader = participantIds.map(
        (userId: number) => this.dataloaderService.loaderUser.load(userId),
      );
      const participants = await Promise.all(resultLoader) as User[];

      const creator = participants.filter(
        (user: User) => user.UserID === creatorId,
      )[0];

      const result = await this.conversationRepository.create({
        ...conversationInput,
        isGroup,
        title,
        avatar,
        creator,
        participants,
        createAt: new Date().toLocaleDateString(),
      });
      await this.conversationRepository.save(result);

      return result;
    } else {
      return conversation[0]
    }
  }

  async deleteConversation(conversationId: number): Promise<Conversation> {
    const conversation = await this.conversationRepository.query(
      `select * from Conversations where ConversationID = ${conversationId}`,
    );
    await this.conversationRepository.delete({
      ConversationID: conversationId,
    });
    return conversation[0];
  }

  // relation
  async creator(conversation: any): Promise<User> {
    if (conversation.creatorId) {
      return this.dataloaderService.loaderUser.load(conversation.creatorId);
    }
  }

  // async reConversationer(Conversation: any): Promise<User> {
  //   if (Conversation.reConversationerId) {
  //     return this.dataloaderService.loaderUser.load(Conversation.reConversationerId);
  //   }
  // }
}
