import { isAuth } from './../middlewares/isAuth';
import { MyContext } from './../types';
import { Like } from './../entities/Like';
import { User } from '../entities/User';
import {
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { Comment } from '../entities/Comment';

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => Int)
  likeCount(@Root() post: Post): Promise<number> {
    return Like.count({ where: { postId: post.id } });
  }
  @FieldResolver(() => Boolean)
  @UseMiddleware(isAuth)
  async userLike(
    @Root() post: Post,
    @Ctx() { res }: MyContext
  ): Promise<boolean> {
    const like = await Like.findOne({
      where: { postId: post.id, username: res.locals.username },
    });
    return like ? true : false;
  }
  @FieldResolver(() => User)
  user(@Root() post: Post) {
    return User.findOne({ username: post.username });
  }
  @FieldResolver(() => [Comment])
  comments(@Root() post: Post): Promise<Comment[]> {
    return Comment.find({
      where: { postId: post.id },
      order: { createdAt: 'DESC' },
    });
  }

  @Query(() => [Post])
  getposts() {
    return Post.find({});
  }
}
