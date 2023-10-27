import Post from '@/components/Post'

export default async function page() {
    // const posts = await fetch('http://localhost:3000/posts');
    // const data = await posts.json();
    // console.log(data);
  return (
      
      <div className='grid grid-cols-1 m-4 place-items-center'>
        <Post />
    </div>
  )
}
