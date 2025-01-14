import { Field, ObjectType } from '@nestjs/graphql';
import { Bill } from 'src/bills/Bill.model';
import { Category } from 'src/categories/Category.model';
import { Event } from 'src/events/Event.model';
import { FCMToken } from 'src/fcmtokens/FCMToken.model';
import { Follow } from 'src/follows/Follow.model';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_UserID' })
  @Field()
  UserID: number;

  @Column({ type: 'nvarchar', length: 200, nullable: true })
  @Field({ nullable: true })
  Username: string;

  @Column({ type: 'nvarchar', length: 200, nullable: true })
  @Field({ nullable: true })
  Email: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  @Field({ nullable: true })
  Password: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  @Field({ nullable: true })
  PhotoUrl: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  about: string;

  @Column({ type: 'nvarchar', length: 20, default: 'Personal', nullable: true })
  @Field({ nullable: true })
  type: string;

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  isChangePassword: number;

  // relation
  // one-to-many
  @OneToMany(() => Event, (event) => event.author)
  author_events: [Event];

  @OneToMany(() => FCMToken, (fcmtoken) => fcmtoken.user)
  fcmTokens: [FCMToken];

  @OneToMany(() => Follow, (follow) => follow.following_user)
  followings: [Follow];

  @OneToMany(() => Follow, (follow) => follow.follower_user)
  followers: [Follow];

  @OneToMany(() => Bill, (bill) => bill.userBuy)
  bills: [Bill];

  @OneToMany(() => Bill, (bill) => bill.authorEvent)
  billAuthors: [Bill];

  // many-to-many
  @ManyToMany(() => Event, (event) => event.users)
  user_events: [Event];

  @ManyToMany(() => Event, (event) => event.followers)
  @Field(() => [Event], { nullable: true })
  followEvents: [Event];

  @ManyToMany(() => Category, (category) => category.users)
  @Field(() => [Category], { nullable: true })
  interests: [Category];
}
