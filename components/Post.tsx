import Image from "next/image"
import { formattedDate } from "@/lib/helpers"
import { getServerSession } from "next-auth";
import Link from "next/link";
import { OptionsButton } from "./OptionsButton";
import { BsSendFill } from "react-icons/bs";
import CommentForm from "./CommentForm";
import { FaRegCommentDots } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import Comment from "./Comment";

type Props = {
    id: number;
    authorName: string;
    authorImage: string;
    authorId: number;
    date: string;
    title: string;
    topic: string;
    content: string;
    comments?: PostComment[];
    users?: Author[];
}



export default async function Post({ authorName, authorImage, date, title, topic, content, id, authorId,comments,users }: Props) {
    const session = await getServerSession();
    const avatar = `https://ui-avatars.com/api/?name=${session?.user?.name}&background=random&rounded=true&size=128&font-size=0.50`;
    const image = session?.user?.image;
    return (
        <>
            <div className="w-full max-w-screen-md p-4 mt-6 border dark:bg-slate-700 bg-slate-200 rounded-2xl">
                <div className="flex items-center justify-between gap-1">
                    <Link href={`/posts/${id}`} className="gap-3.5	flex items-center ">
                        <Image src={authorImage ?? avatar}
                            alt={`${authorName} image`} width={40} height={40} className="object-cover w-10 h-10 bg-yellow-500 rounded-full" />
                        <div className="flex flex-col">
                            <b className="mb-1 capitalize">{authorName}</b>
                            <time className="text-xs text-gray-400">{formattedDate(date)}</time>
                        </div>
                    </Link>
                    <OptionsButton authorId={authorId} id={id} /> 
                </div>
                <Link href={`/posts/${id}`} className="grid">
                    <h2 className="whitespace-pre-wrap mt-7">{title}</h2>
                    {topic && (<span className="">#<b className="mb-2 text-blue-400">{topic.split(" ").join("_")}</b></span>)}
                    <p className="w-full mt-8 mb-2 text-left">{content}</p>
                </Link>
                {/* <div className="flex flex-wrap justify-center gap-2 pb-4 mt-5 border-b ">
                    <img src="https://images.unsplash.com/photo-1610147323479-a7fb11ffd5dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80" className="flex-auto object-cover w-1/3 bg-red-500 rounded-2xl h-96" alt="photo" />
                    <img src="https://images.unsplash.com/photo-1614914135224-925593607248?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80" className="flex-auto object-cover w-1/3 bg-red-500 rounded-2xl h-96" alt="photo" />
                </div> */}
                <div className="flex items-center justify-around h-10 my-4 border-y">
                    <div className="flex items-center gap-3 transition-colors hover:cursor-pointer group">
                        <FaRegCommentDots className="h-8 duration-500 w-7 group-hover:text-slate-500 dark:text-white text-slate-800" />
                        <p className="text-sm duration-300 group-hover:text-slate-500 dark:text-white text-slate-800">{comments?.length} <span className="hidden sm:inline-block">Comments</span></p>
                    </div>
                    <div className="flex items-center gap-3 transition-colors hover:cursor-pointer group">
                        <AiOutlineHeart className="h-8 duration-500 w-7 group-hover:text-slate-500 dark:text-white text-slate-800" />
                        <p className="text-sm duration-300 group-hover:text-slate-500 dark:text-white text-slate-800">{comments?.length} <span className="hidden sm:inline-block">Likes</span></p>
                    </div>
                    <div className="flex items-center gap-3 transition-colors hover:cursor-pointer group">
                        <PiShareFatLight className="h-8 duration-500 w-7 group-hover:text-slate-500 dark:text-white text-slate-800" />
                        <p className="text-sm duration-300 group-hover:text-slate-500 dark:text-white text-slate-800"><span className="hidden sm:inline-block">Share</span></p>
                    </div>
                    <div className="flex items-center gap-3 transition-colors hover:cursor-pointer group">
                        <CiBookmark className="h-8 duration-500 w-7 group-hover:text-slate-500 dark:text-white text-slate-800" />
                        <p className="text-sm duration-300 group-hover:text-slate-500 dark:text-white text-slate-800"><span className="hidden sm:inline-block">Saved</span></p>
                    </div>
                </div> 
                <div className="flex items-start justify-between mt-4">
                    <Image src={image && !image.includes("fbsbx") ?image :avatar} alt={`${session?.user?.name} user image`} width={40} height={40} className="object-cover w-10 h-10 bg-yellow-500 border rounded-full" />
                    <CommentForm id={id}/>
                </div>
            {comments && users && comments?.length > 0 && users?.length > 0 ?
                comments.map((comment: PostComment) => {
                    const user = users.find((user: Author) => user.id === comment.authorId)                    
                    return (
                        <Comment key={comment.id} user={user!} comment={comment} />
                    )
                }
                ) : null}
            </div>
        </>
    )
}
