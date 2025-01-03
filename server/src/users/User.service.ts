import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { FCMToken } from 'src/fcmtokens/FCMToken.model';
import { Repository } from 'typeorm';
import { FollowEventInput } from './type/followEvent.input';
import { UserInput } from './type/user.input';
import { User } from './User.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataloaderService: DataLoaderService,
  ) {}

  users(): Promise<User[]> {
    return this.userRepository.query('select * from Users');
  }

  async getUserId(userId: number): Promise<User> {
    const data = await this.userRepository.query(
      `select * from Users where UserID = ${userId}`,
    );
    return data[0];
  }

  async user(email: string): Promise<User> {
    const data = await this.userRepository.query(
      `select * from Users where Email = '${email}'`,
    );
    return data[0];
  }

  async editUser({
    userId,
    userInput,
  }: {
    userId: number;
    userInput: UserInput;
  }): Promise<User> {
    await this.userRepository.query(
      `update Users set Username = '${userInput.Username}', PhotoUrl = '${userInput.PhotoUrl}' where UserID = ${userId}`,
    );
    const result = await this.userRepository.query(
      `select * from Users where UserID = ${userId}`,
    );
    return result[0];
  }

  async editFollowEvent({
    type,
    followEventInput,
  }: {
    type: string;
    followEventInput: FollowEventInput;
  }): Promise<string> {
    const { UserID, EventID } = followEventInput;
    try {
      if (type === 'delete') {
        await this.userRepository.query(`
      delete from Events_Followers where UserID = ${UserID} and EventID =${EventID}
      `);
      } else {
        await this.userRepository.query(`
      insert into Events_Followers (UserID, EventID) values (${UserID}, ${EventID})
      `);
      }

      return type === 'insert'
        ? 'Update follower completed !'
        : 'Delete follower completed !';
    } catch (error) {
      throw new UnauthorizedException('Delete/update follower error !');
    }
  }

  // relation
  async followEvents(UserID: number): Promise<Event[]> {
    return this.userRepository.query(
      `select Events.* from Events 
        inner join Events_Followers 
        on Events.EventID = Events_Followers.EventID 
        where Events_Followers.UserID = ${UserID}
  `,
    );
  }

  async fcmTokens(UserID: number): Promise<FCMToken[]> {
    return this.userRepository.query(`
      select * from FCMTokens where userId = ${UserID}
      `);
  }

  async followings(UserID: number): Promise<User[]> {
    const data = await this.userRepository.query(`
      select * from Follows where followingId = ${UserID}
      `);

    let result: any;
    if (data) {
      const resultLoader = data.map((follow: any) =>
        this.dataloaderService.loaderUser.load(follow.followerId),
      );
      result = await Promise.all(resultLoader);
    }
    return result;
  }

  async followers(UserID: number): Promise<User[]> {
    const data = await this.userRepository.query(`
      select * from Follows where followerId = ${UserID} 
      `);
    let result: any;
    if (data) {
      const resultLoader = data.map((follow: any) =>
        this.dataloaderService.loaderUser.load(follow.followingId),
      );
      result = await Promise.all(resultLoader);
    }
    return result;
  }
}
