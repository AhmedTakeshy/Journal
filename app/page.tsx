import Link from "next/link";
import { getServerSession } from 'next-auth';
import Post from "@/components/Post";
import PostForm from "@/components/PostForm";

const getPostsAndAuthors = async (email:string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/posts?email=${email}`, { next: { tags: ["posts"] } })
  const data = await res.json()
  return data
}

export default async function Home() {
  const session = await getServerSession()
  const postsAndAuthors = await getPostsAndAuthors(session?.user?.email as string);
  return (
    session?.user
      ?
      (
        <div className='grid grid-cols-1 m-4 place-items-center w-[40rem]'>
          <PostForm method="POST" />
          {postsAndAuthors.posts?
          postsAndAuthors.posts.map((post: Post) => {
            const author = postsAndAuthors.postsAuthor.find((author: Author) => author.id === post.authorId);
            return (
              <Post
                key={post.id}
                id={post.id}
                authorId={post.authorId}
                authorImage={author.image}
                authorName={author.name}
                date={post.createdAt}
                title={post.title}
                content={post.content}
                topic={post.topic} />
            )
          })
          :null}
        </div>
      )
      :
      (
        <div className="relative flex flex-col items-center justify-center mt-24 h-[70vh]">
          <div className="mx-auto rounded-full dark:bg-cyan-700 blur-[90px] absolute  w-80 h-80 z-[-1] animate-pulse" >
          </div>
          <h1 className="mb-4 text-3xl font-bold">Try it now for free.</h1>
          <p className="w-full max-w-[30rem]">Here you can express all you feelings without any restrictions. <Link href="/posts" className="text-xl font-semibold uppercase transition-all duration-500 hover:text-teal-700 text-cyan-500 hover:tracking-[.5rem]">Post it now.</Link></p>
        </div>
      )
  )
}
