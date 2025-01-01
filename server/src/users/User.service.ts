import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FCMToken } from 'src/fcmtokens/FCMToken.model';
import { Repository } from 'typeorm';
import { User } from '.';
import { FollowEventInput } from './type/followEvent.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  users(): Promise<User[]> {
    return this.userRepository.query('select * from Users');
  }

  async getUserId(userId: number): Promise<User> {
    const data = await this.userRepository.query(
      `select * from Users where UserID = '${userId}'`,
    );
    return data[0];
  }

  async user(email: string): Promise<User> {
    const data = await this.userRepository.query(
      `select * from Users where Email = '${email}'`,
    );
    return data[0];
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
      `
      select Events.* from Events 
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
      select * from Followings where userId = ${UserID}
      `);
    let result: any;
    if (data) {
      const response = data.map(async (following: any) => {
        const result = await this.userRepository.query(
          `select * from Users where UserID = ${following.friendId}`,
        );
        return result[0];
      });
      result = await Promise.all(response);
    }
    return result;
  }

  async followers(UserID: number): Promise<User[]> {
    const data = await this.userRepository.query(`
      select * from Followers where userId = ${UserID}
      `);
    let result: any;
    if (data) {
      const response = data.map(async (follower: any) => {
        const result = await this.userRepository.query(
          `select * from Users where UserID = ${follower.friendId}`,
        );
        return result[0];
      });
      result = await Promise.all(response);
    }
    return result;
  }
}
