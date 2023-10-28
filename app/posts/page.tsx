import Post from '@/components/Post'
import { getServerSession } from 'next-auth';


const getPostsUser = async () => {
  const session = await getServerSession();
  const postsAndUser = await fetch(`http://localhost:3000/api/user?email=${session?.user?.email}`, { next: { tags: ["userPosts"] } });
  const { posts, user } = await postsAndUser.json();
  return { posts, user };
}

export default async function page() {
  const { posts, user } = await getPostsUser();

  return (
    <div className='grid grid-cols-1 m-4 place-items-center'>
      {posts.map((post: Post) => {
        return (
          <Post
            key={post.id}
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




