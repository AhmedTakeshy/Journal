import Post from '@/components/Post'
import PostForm from '@/components/PostForm';
import { getServerSession } from 'next-auth';


const getPostsUser = async (email: string) => {
  const postsAndUser = await fetch(`${process.env.BASE_URL}/api/users?email=${email}`, { next: { tags: ["userPosts"] } });
  const { posts, user } = await postsAndUser.json();
  return { posts, user };
}

export default async function page() {
  const session = await getServerSession();
  const { posts, user } = await getPostsUser(session?.user?.email as string);

  return (
    <div className='grid grid-cols-1 m-4 place-items-center w-[40rem]'>
      <PostForm method='POST' />
      {posts.map((post: Post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            authorId={post.authorId}
            authorImage={user.image}
            authorName={user.name}
            date={post.createdAt}
            title={post.title}
            content={post.content}
            topic={post.topic} />
        )
      }).reverse()
      }
    </div>
  )
}




