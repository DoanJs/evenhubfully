import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Expo from 'expo-server-sdk';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { Event } from 'src/events/Event.model';
import { Position } from 'src/positions/Position.model';
import { User } from 'src/users/User.model';
import { ParamsInput } from 'src/utils/types/Params.input';
import { Repository } from 'typeorm';
import { EventInput } from './type/event.input';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private dataloaderService: DataLoaderService,
  ) {}

  async handlePushNotification({
    somePushTokens,
    data,
  }: {
    somePushTokens: string[];
    data: any;
  }) {
    const expo = new Expo({ useFcmV1: true });

    // Create the messages that you want to send to clients
    const messages = [];
    for (const pushToken of somePushTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
      messages.push({
        to: pushToken,
        sound: 'default',
        body: 'Bạn đã được mời tham gia vào sự kiện',
        data,
      });
    }

    const chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(chunk);
        console.log(ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  }

  toRoad(val: number) {
    return (val * Math.PI) / 180;
  }

  calcDistanceLocation({
    currentLat,
    currentLong,
    addressLat,
    addressLong,
  }: {
    currentLat: number;
    currentLong: number;
    addressLat: number;
    addressLong: number;
  }) {
    const r = 6371;
    const dLat = this.toRoad(addressLat - currentLat);
    const dLon = this.toRoad(addressLong - currentLong);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(this.toRoad(currentLat)) *
        Math.cos(this.toRoad(addressLat));
    return r * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  async events(paramsInput: ParamsInput): Promise<Event[]> {
    const { take, skip } = paramsInput;
    if (take && skip) {
      return this.eventRepository.query(`SELECT * FROM Events
    ORDER BY EventID
    OFFSET ${skip} ROWS
    FETCH NEXT ${take} ROWS ONLY`);
    } else {
      return this.eventRepository.query('select * from Events');
    }
  }

  async getEventConditions(condition: string): Promise<Event[]> {
    const result = await this.eventRepository.query(
      `select * from Events where ${condition !== '' ? condition : `EventID != ''`}`,
    );
    return result;
  }

  async event(eventId: number): Promise<Event> {
    const result = await this.eventRepository.query(
      `select * from Events where EventID = ${eventId}`,
    );
    return result[0];
  }

  async searchEvent(keySearch: string): Promise<Event[]> {
    const result = await this.eventRepository.query(
      `select * from Events where title LIKE '%${keySearch}%'`,
    );
    return result;
  }

  async events_upcoming(): Promise<Event[]> {
    const events = await this.eventRepository.query(`select * from Events`);
    return events.filter((event: any) => event.startAt > Date.now());
  }

  async events_nearby(paramsInput: ParamsInput): Promise<Event[]> {
    const { lat, long, distance } = paramsInput.data;

    const events = await this.eventRepository.query(
      `SELECT Events.*, Positions.lat, Positions.lng 
          FROM Events 
            INNER JOIN Positions   
            ON Events.EventID = Positions.EventID
      `,
    );

    if (events.length > 0) {
      const items = [];
      events.forEach((item: any) => {
        const eventDistance = this.calcDistanceLocation({
          currentLat: lat,
          currentLong: long,
          addressLat: item.lat,
          addressLong: item.lng,
        });

        if (eventDistance < distance) {
          const { lat, lng, ...event } = item;
          items.push(event);
        }
      });

      return items.filter((event: any) => event.startAt > Date.now());
    }
  }

  async createEvent(eventinput: EventInput): Promise<Event> {
    const { users, position, ...data } = eventinput;
    const author = await this.eventRepository.query(
      `select * from Users where UserID = ${data.authorId}`,
    );
    const result = await this.eventRepository.create({
      ...data,
      author: author[0],
    });
    await this.eventRepository.save(result);

    const response = users.map(async (userId: any) => {
      await this.eventRepository.query(
        `insert into Events_Users (UserID, EventID) values (${Number(userId)}, ${Number(result.EventID)})`,
      );
    });
    Promise.resolve(response);

    await this.eventRepository.query(
      `insert into Positions (lat, lng, eventId) values (${Number(position.lat)}, ${Number(position.lng)}, ${Number(result.EventID)})`,
    );

    return result;
  }

  async pushInviteNotifications({
    userIds,
    eventId,
    authorId,
  }: {
    userIds: number[];
    eventId: number;
    authorId: number;
  }): Promise<string> {
    const somePushTokens = [];
    const someEmails = [];

    const author = await this.eventRepository.query(
      `select * from Users where UserID = ${authorId}`,
    );

    const result = userIds.map(async (id: number) => {
      const response = await this.eventRepository.query(
        `select * from FCMTokens where userId = ${id}`,
      );
      if (response.length > 0) {
        response.map((item: any) => {
          if (
            somePushTokens.findIndex((key: string) => key === item.FCMToken) ===
            -1
          ) {
            somePushTokens.push(item.FCMToken);
          }
        });
      } else {
        const user = await this.eventRepository.query(
          `select * from Users where userId = ${id}`,
        );
        someEmails.push(user[0].Email);
      }
      // return response;
    });
    await Promise.all(result);

    if (somePushTokens.length > 0) {
      await this.handlePushNotification({
        somePushTokens,
        data: { eventId, userSend: author[0] },
      });
    }

    if (someEmails.length > 0) {
      // send mail
    }

    return;
  }

  // relation
  async author(event: any): Promise<User> {
    if (event.authorId) {
      return this.dataloaderService.loaderUser.load(event.authorId);
    }
  }

  async users(event: any): Promise<User[]> {
    const usersEvent = await this.eventRepository.query(
      `select * from Events_Users where EventID = ${event.EventID}`,
    );
    const resultLoader = usersEvent.map((obj: any) =>
      this.dataloaderService.loaderUser.load(obj.UserID),
    );
    return await Promise.all(resultLoader);
  }

  async position(event: any): Promise<Position> {
    const result = await this.eventRepository.query(
      `select * from Positions where eventId = ${event.EventID}`,
    );
    return result[0];
  }

  async followers(event: any): Promise<User[]> {
    const result = await this.eventRepository.query(
      `select * from Events_Followers where EventID = ${event.EventID}`,
    );
    return result;
  }
}
