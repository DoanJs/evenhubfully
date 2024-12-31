import { Field, ObjectType } from '@nestjs/graphql';
import { Position } from 'src/positions/Position.model';
import { User } from 'src/users';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Events' })
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_EventID' })
  @Field()
  EventID: number;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  title: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  locationTitle: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  locationAddress: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  imageUrl: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  price: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  category: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  date: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  startAt: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  endAt: Date;

  @Column({
    type: 'date',
    nullable: true,
    default: new Date().toLocaleDateString(), //check again !
  })
  @Field({ nullable: true })
  createAt: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  updateAt: Date;

  // relation
  // one-to-one
  @OneToOne(() => Position, (position) => position.event)
  @Field({ nullable: true })
  position: Position;

  // many-to-one
  @ManyToOne(() => User, (user) => user.author_events, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'authorId',
    foreignKeyConstraintName: 'FK_authorId_Events',
  })
  @Field((types) => User, { nullable: true })
  author: User;

  // many-to-many
  @ManyToMany(() => User, (user) => user.user_events, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'Events_Users',
    joinColumn: {
      name: 'EventID',
      foreignKeyConstraintName: 'FK_EventID_Events_Users',
    },
    inverseJoinColumn: {
      name: 'UserID',
      foreignKeyConstraintName: 'FK_UserID_Events_Users',
    },
  })
  @Field((types) => [User], { nullable: true })
  users: [User];

  @ManyToMany(() => User, (user) => user.user_followers, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'Events_Followers',
    joinColumn: {
      name: 'EventID',
      foreignKeyConstraintName: 'FK_EventID_Events_Followers',
    },
    inverseJoinColumn: {
      name: 'UserID',
      foreignKeyConstraintName: 'FK_UserID_Events_Followers',
    },
  })
  @Field((types) => [User], { nullable: true })
  followers: [User];
}