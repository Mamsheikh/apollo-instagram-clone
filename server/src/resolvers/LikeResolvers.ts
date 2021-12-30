import { Arg, Mutation, Resolver, UseMiddleware, Ctx } from 'type-graphql';
import { Like } from '../entities/Like';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';

@Resolver(Like)
export class LikeResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleLike(
    @Arg('postId') postId: string,
    @Ctx() { res }: MyContext
  ): Promise<boolean> {
    try {
      let like = await Like.findOne({
        where: { postId, username: res.locals.username },
      });
      if (!like) {
        await Like.create({ postId, username: res.locals.username }).save();
        return true;
      } else {
        await like.remove();
        return true;
      }
    } catch (error) {
      console.log(`failed to like post: ${error}`);
      return false;
    }
  }
}
