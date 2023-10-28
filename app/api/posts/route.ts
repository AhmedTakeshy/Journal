import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import * as z from "zod";

const postSchema = z.object({
    title: z.string().min(5, "Please enter a valid title."),
    topic: z.string(),
    content: z.string().min(10, "Description must be at least 10 characters.").max(500, "Description can't be more than 500 characters."),
    published: z.boolean(),
    authorEmail: z.string().email("Please enter a valid email"),
})

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
        revalidateTag("posts")
        return Response.json({ posts, postsAuthor })
    } catch (error) {
        return Response.json({ message: "Something went wrong!" }, { status: 500 })
    }
}







export async function POST(req: Request) {
    try {
        const { title, topic, content, published, authorEmail } = postSchema.parse(await req.json())
        const post = await prisma.post.create({
            data: {
                title,
                topic,
                content,
                published,
                author: {
                    connect: {
                        email: authorEmail
                    }
                },
            }
        })

        return Response.json(post)
    } catch (error) {
        return Response.json({ message: "Something went wrong!" }, { status: 500 })
    }
}