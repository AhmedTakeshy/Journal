import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get('email');
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email!
            },
        })
        const posts = await prisma.post.findMany({
            where: {
                published: true,
                id: {
                    notIn: user?.hiddenPosts
                },
            },
            orderBy: {
                createdAt: "desc"
            }
            
        })
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
        return Response.json({ message: "Something went wrong!", status: 500 })
    }
}




