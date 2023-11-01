import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function GET() {
    try {
        const posts = await prisma.post.findMany()
        const postsAuthorIds = posts.map((post) => post.authorId)
        const postsAuthor = await prisma.user.findMany({
            where: {
                id: {
                    in: postsAuthorIds
                }
            }
        })
        console.log("server",posts, postsAuthor)
        if(!posts) return Response.json({ message: "Posts are not found", status: 404 })
        revalidateTag("posts")
        return Response.json({ posts, postsAuthor })
    } catch (error) {
        return Response.json({ message: "Something went wrong!", status: 500 })
    }
}




