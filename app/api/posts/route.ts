import { prisma } from "@/lib/prisma";

export async function GET() {
    const posts = await prisma.post.findMany()

    return Response.json(posts)
}

export async function POST(req: Request) {
    const body = await req.json()
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            published: body.published,
            author: {
                connect: { email: body.authorEmail },
            },
        }
    })
    return Response.json(post)
}