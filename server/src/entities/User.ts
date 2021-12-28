import { hash, verify } from 'argon2';
import { IsAlphanumeric, IsEmail, MinLength } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  Index,
  OneToMany,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import { BaseColumns } from './BaseColumn';
import { Post } from './Post';
import { Profile } from './Profile';

@ObjectType()
@Entity('users')
export class User extends BaseColumns {
  @Field()
  @IsAlphanumeric(undefined, { message: 'Username must be alphanumeric' })
  @MinLength(3, { message: 'Username must be atleast 3 characters long' })
  @Index()
  @Column({ unique: true })
  username: string;

  @Field()
  @IsEmail(undefined, { message: 'Invalid Email Address' })
  @Column({ unique: true })
  email: string;

  // @Field()
  @MinLength(6, { message: 'Password must be atleast 6 characters long' })
  @Column()
  password: string;

  //relations

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  verifyPassword(password: string) {
    return verify(this.password, password);
  }
}
