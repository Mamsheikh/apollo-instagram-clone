import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { useToggleLikeMutation } from '../../../generated/graphql';
//   import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';

export const PostCard = ({ ...post }) => {
  const [toggleLike] = useToggleLikeMutation();
  return (
    <div className='bg-white  border  rounded-sm mt-0 my-7'>
      {/* Post Header */}
      <div className='flex items-center  p-5 '>
        {/* <img
            className='h-12 w-12 rounded-full object-cover border p-1 mr-3'
            src={props.avatar}
            alt=''
          /> */}
        <div className='h-12 w-12 rounded-full object-cover border p-1 mr-3'></div>
        <p className='flex-1 font-bold'>{post.username}</p>
        <DotsHorizontalIcon className='w-5 h-5' />
      </div>

      {/* Image Post */}
      <img className=' objec-cover w-full' src={post.imgURL} alt='' />

      {/* Reaction Buttons */}

      <div className='flex justify-between px-4 pt-4'>
        <div className='flex items-center space-x-4'>
          <HeartIcon
            onClick={async () =>
              await toggleLike({
                variables: { postId: post.id },
                refetchQueries: ['GETPOSTS'],
              })
            }
            className={`${
              post.userLike ? 'text-red-500 fill-current' : ''
            } btn hover:text-red-500 hover:fill-current`}
          />
          <ChatIcon className='btn' />
          <PaperAirplaneIcon className='btn' />
        </div>
        <BookmarkIcon className='btn' />
      </div>
      <span className='px-5 text-sm font-semibold py-4'>
        {post.likeCount} likes
      </span>

      {/* Caption */}
      <p className='p-5 truncate'>
        <span className='font-bold mr-2'>{post.username}</span>
        {post.caption}
      </p>

      {/* Input Comment Field */}
      <form className='flex items-center p-4'>
        <EmojiHappyIcon className='h-7' />
        <input
          placeholder='Add a comment...'
          className='border-none flex-1 focus:ring-0 outline-none'
          type='text'
        />
        <button className='font-semibold text-blue-400'>Post</button>
      </form>
    </div>
  );
};
