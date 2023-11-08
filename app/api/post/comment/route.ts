import { prisma } from "@/lib/prisma"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export async function POST(req: Request){
    const data = await req.json()
    const { id, content,author} = data
    const user = await prisma.user.findUnique({where: {email: author}})
    await prisma.comment.create({
        data: {
            content,
            postId: +id,
            authorId: user?.id!,
        }
    })
    revalidateTag("comments")
    return Response.json({message: "Created the comment.", status: 200})
}


export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    const comments = await prisma.comment.findMany({
        where: {
            postId: +id!,
        },
        select: {
            id: true,
            content: true,
            postId: true,
            authorId: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: comments.map(comment => comment.authorId)
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            }
    })
    revalidateTag("comments")
    return Response.json({users, comments})
}