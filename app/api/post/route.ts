import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

import * as z from "zod";

const postSchema = z.object({
    title: z.string().min(5, "Please enter a valid title."),
    topic: z.string(),
    content: z.string().min(10, "Description must be at least 10 characters.").max(500, "Description can't be more than 500 characters."),
    published: z.boolean(),
    authorEmail: z.string().email("Please enter a valid email"),
})


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: +id!,
            },
        });
        if (!post) return Response.json({ message: "Post is not found", status: 404 });
        revalidateTag("post")
        return Response.json(post);
    } catch (error) {
        return Response.json({ message: "Something went wrong", status: 500 });
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

        return Response.json({ message: "Post has been created successfully.", status: 201, post });
    } catch (error) {
        return Response.json({ message: "Something went wrong!" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email!
            },
            select: {
                id: true
            }
        })
        const post = await prisma.post.findUnique({
            where: {
                id: +id!
            },
            select: {
                authorId: true
            }
        })
        if (user?.id !== post?.authorId) return Response.json({ message: "You are not authorized to delete this post.", status: 401 });
        await prisma.post.delete({
            where: {
                id: +id!,
            },
        });
        revalidateTag("deletePost")
        return Response.json({ message: "Post has been deleted successfully.", status: 200 });
    } catch (error) {
        return Response.json({ message: "Something went wrong", status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    try {
        const { title, topic, content, published, authorEmail } = postSchema.parse(await req.json())
        const post = await prisma.post.update({
            where: {
                id: +id!,
            },
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
        revalidateTag("updatePost")
        return Response.json({ message: "Post has been updated successfully.", status: 200, post });
    }
    catch (error) {
        return Response.json({ message: "Something went wrong", status: 500 });
    }
}