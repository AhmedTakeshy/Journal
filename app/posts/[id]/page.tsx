import PostForm from '@/components/PostForm'
import { getServerSession } from 'next-auth';
import { getPostsUser } from '../page';
import Post from '@/components/Post';

type Props = {
  params: {
    id: number
  }
}

const getPost = async (id: number) => {
  const res = await fetch(`${process.env.BASE_URL}/api/post?id=${id}`, { next: { tags: ["updatePost"] } });
  const data = await res.json();
  return data;
}

export default async function page({ params: { id } }: Props) {
  const post = await getPost(id);
  const session = await getServerSession();
  const { user } = await getPostsUser(session?.user?.email as string);

  return (
    <div className="grid max-w-screen-md w-[40rem] gap-4 m-4 place-items-center ">
      <Post
        id={post.id}
        authorId={post.authorId}
        authorImage={user.image}
        authorName={user.name}
        date={post.createdAt}
        title={post.title}
        content={post.content}
        topic={post.topic}
      />
    </div>
  )
}



