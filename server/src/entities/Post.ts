import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { BaseColumns } from './BaseColumn';
import { User } from './User';
import { MinLength } from 'class-validator';
import { EXPRESS_ENDPOINT } from '../constants';

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

  // Methods
  @AfterLoad()
  generateURL() {
    this.imgURL = this.imgURL.startsWith('images/')
      ? `${EXPRESS_ENDPOINT}/${this.imgURL}`
      : this.imgURL;
  }
}
