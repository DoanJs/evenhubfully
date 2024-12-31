import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Followings' })
@ObjectType()
export class Following {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_FollowingID' })
  @Field()
  FollowingID: number;

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  friendId: number;

  @Column({
    type: 'date',
    nullable: true,
    default: new Date().toLocaleDateString(),
  })
  @Field({ nullable: true })
  createAt: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  updateAt: Date;

  // relation
  // one-to-one

  // many-to-one
  @ManyToOne(() => User, (user) => user.followings, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'userId',
    foreignKeyConstraintName: 'FK_userId_Followings',
  })
  following_user: User;
  // many-to-many
}
