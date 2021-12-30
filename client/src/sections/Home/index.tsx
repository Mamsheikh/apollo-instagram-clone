import { useGetpostsQuery, Post } from '../../generated/graphql';
import { PostCard } from '../../lib/components/PostCard';

export const Home = () => {
  const { data, loading, error } = useGetpostsQuery();
  return (
    <main className='grid grid-cols-1  max-w-xl mx-auto'>
      <section className='col-span-2'>
        {/* <Stories /> */}
        {data?.getposts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </section>
      {/* <section></section> */}+
    </main>
  );
};
