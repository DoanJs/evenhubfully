import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/events';
import { FCMToken } from 'src/fcmtokens/FCMToken.model';
import { Following } from 'src/followings/Following.model';
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

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  isChangePassword: number;

  // relation
  // one-to-many
  @OneToMany(() => Event, (event) => event.author)
  author_events: [Event];

  @OneToMany(() => FCMToken, (fcmtoken) => fcmtoken.user)
  fcmTokens: [FCMToken];

  @OneToMany(() => Following, (following) => following.following_user)
  followings: [Following];

  // many-to-many
  @ManyToMany(() => Event, (event) => event.users)
  user_events: [Event];

  @ManyToMany(() => Event, (event) => event.followers)
  @Field(() => [Event], { nullable: true })
  followEvents: [Event];
}
