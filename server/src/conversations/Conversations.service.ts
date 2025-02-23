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
    let participants: User[];
    let title: string;
    let avatar: string;
    let isGroup: number;

    if (conversationInput.participantIds.length > 0) {
      const resultLoader = conversationInput.participantIds.map(
        (userId: number) => this.dataloaderService.loaderUser.load(userId),
      );
      participants = await Promise.all(resultLoader);
    }

    const creator = participants.filter(
      (user: User) => user.UserID === conversationInput.creatorId,
    )[0];

    if (conversationInput.isGroup === 0) {
      isGroup = 0;
      const user = participants.filter(
        (user: User) => user.UserID !== conversationInput.creatorId,
      ) as [User];

      title = user[0].Username;
      avatar = user[0].PhotoUrl;
    } else {
      isGroup = 1;
    }

    const conversation = await this.conversationRepository.query(
      `select * from Conversations where title = '${title}' and creatorId = ${conversationInput.creatorId}`,
    );

    if (!conversation || (conversation && conversation.length === 0)) {
      const result = await this.conversationRepository.create({
        ...conversationInput,
        avatar,
        title,
        isGroup,
        creator,
        participants,
        createAt: new Date().toLocaleDateString(),
      });
      await this.conversationRepository.save(result);

      return result;
    } else {
      throw new Error('Conversation is exist !');
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
  // async creator(conversation: any): Promise<User> {
  //   if (Conversation.ConversationerId) {
  //     return this.dataloaderService.loaderUser.load(Conversation.ConversationerId);
  //   }
  // }

  // async reConversationer(Conversation: any): Promise<User> {
  //   if (Conversation.reConversationerId) {
  //     return this.dataloaderService.loaderUser.load(Conversation.reConversationerId);
  //   }
  // }
}
