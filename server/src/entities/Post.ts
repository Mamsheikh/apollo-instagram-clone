import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { BaseColumns } from './BaseColumn';
import { User } from './User';
import { Comment } from './Comment';
import { MinLength } from 'class-validator';
import { EXPRESS_ENDPOINT } from '../constants';
import { Like } from './Like';

@ObjectType()
@Entity('posts')
export class Post extends BaseColumns {
  @Field()
  @MinLength(3, { message: 'Post caption must be minimum 3 characters long' })
  @Column()
  caption: string;

  @Field()
  @Column()
  imgURL: string;

  //relations

  @Field()
  @Column()
  username: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  // Methods
  @AfterLoad()
  generateURL() {
    this.imgURL = this.imgURL.startsWith('images/')
      ? `${EXPRESS_ENDPOINT}/${this.imgURL}`
      : this.imgURL;
  }
}
