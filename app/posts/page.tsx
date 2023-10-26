import Post from '@/components/Post'
import React from 'react'

export default async function page() {
    const posts = await fetch('http://localhost:3000/posts');
    const data = await posts.json();
    console.log(data);
  return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Post/>
      </div>
  )
}
