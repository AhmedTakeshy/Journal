import { formattedDate, timeAgo } from "@/lib/helpers"
import Image from "next/image";

type Props = {
    user: Author;
    comment: PostComment;
}

export default async function Comment({ user, comment }: Props) {
    const image = user?.image? user.image : `https://ui-avatars.com/api/?name=${user?.name}&background=random&rounded=true&size=128&font-size=0.50`;
    const date = timeAgo(comment.createdAt);
    return (
        <div className="flex items-start gap-2 mt-4">
            <Image src={image} className="w-10 h-10 bg-white border rounded-full" alt={`${user.name} image`} width={80} height={80} />
            <div className="grid">
                <div className="grid grid-cols-1 p-2 mb-1 shadow-lg rounded-xl bg-slate-800">
                    <p className="overflow-hidden text-sm truncate whitespace-nowrap">{user.name}</p>
                    <p className="text-base break-words">
                        {comment.content}
                    </p>
                </div>
                <p className="ml-1 text-xs">{date}</p>
            </div>
        </div>
    )
}