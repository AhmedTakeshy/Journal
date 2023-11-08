import Post from '@/components/Post';

type Props = {
  params: {
    id: number
  }
}

const getPost = async (id: number) => {
  const res = await fetch(`${process.env.BASE_URL}/api/post?id=${id}`, { next: { tags: ["userPost"] } });
  const data = await res.json();
  return data;
}

const getComments = async (id: number) => {
  const res = await fetch(`${process.env.BASE_URL}/api/post/comment?id=${id}`, {next: {revalidate:0} });
  const data = await res.json();
  return data;
}

// export const revalidate = 30;

export default async function page({ params: { id } }: Props) {
  const {post,user} = await getPost(id);  
  const {users,comments} = await getComments(id);

  return (
    <div className="grid max-w-screen-md w-[40rem] gap-4 m-4 place-items-center ">
      <Post
        id={post.id}
        authorId={post.authorId}
        authorImage={user?.image}
        authorName={user?.name}
        date={post.createdAt}
        title={post.title}
        content={post.content}
        topic={post.topic}
        comments={comments}
        users={users}
      />
    </div>
  )
}



