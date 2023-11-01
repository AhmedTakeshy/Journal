import PostForm from '@/components/PostForm'

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


    return (
        <div className="grid max-w-screen-md w-[40rem] gap-4 place-items-center ">
            <PostForm method="PUT" data={post} />
        </div>
    )
}