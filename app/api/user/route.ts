import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt";
import * as z from "zod";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

const userSchema = z.object({
    username: z.string().min(3, "Username is required").max(25),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters.")
})

// const getSession = async () => {
//     const res = await fetch("http://localhost:3000/api/auth", {
//         credentials: "include",
//         headers: {
//             Cookie: req.headers.cookie
//         }
//         })
//     const session = await res.json()
//     return session
// }

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get('email')
    console.log(email)
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email!
            },
        })
        const posts = await prisma.post.findMany({
            where: {
                authorId: user?.id
            }
        })
        revalidateTag("userPosts")
        console.log(user, posts)
        return Response.json({ posts, user })
    } catch (error) {
        return Response.json({ message: "Something went wrong!" }, { status: 500 })
    }
}


export async function POST(req: Request) {
    try {
        return await signUp(req)
    } catch (error) {
        return Response.json({ message: "Something went wrong!" }, { status: 500 })
    }
}


const signUp = async (req: Request) => {
    const { username, email, password } = userSchema.parse(await req.json())
    const existedUserEmail = await prisma.user.findUnique({
        where: {
            email,

        }
    })
    const existedUserUsername = await prisma.user.findUnique({
        where: {
            name: username,

        }
    })
    if (existedUserEmail) return Response.json({ message: "User with this email already exists" }, { status: 409 })
    if (existedUserUsername) return Response.json({ message: "User with this username already exists" }, { status: 409 })
    const hashedPassword = await hash(password, 10)
    if (!existedUserEmail && !existedUserUsername) {
        const user = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword
            }
        })
        const { email: userEmail, name: userName } = user
        return Response.json({ message: `User ${userName} has been created successfully, with ${userEmail}.` }, { status: 201 })
    }
}


