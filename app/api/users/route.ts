import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma"


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get('email')
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email!
            },
        })
        const posts = await prisma.post.findMany({
            where: {
                authorId: user?.id
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        revalidateTag("userPosts")
        return Response.json({ posts, user })
    } catch (error) {
        return Response.json({ message: "Something went wrong!", status: 500 })
    }
}