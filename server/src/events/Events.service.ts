import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { Position } from 'src/positions/Position.model';
import { User } from 'src/users/User.model';
import { ParamsInput } from 'src/utils/types/Params.input';
import { Repository } from 'typeorm';
import { Event } from 'src/events/Event.model';
import { EventInput } from './type/event.input';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private dataloaderService: DataLoaderService,
  ) {}

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

    const response = eventinput.users.map(async (userId: any) => {
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
