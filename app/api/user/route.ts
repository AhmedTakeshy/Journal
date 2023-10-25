import { prisma } from "@/lib/prisma"
import {hash} from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
    username:z.string().min(3, "Username is required").max(25),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters.")
})

export async function POST(req:Request){
    try {
       return await signUp(req)
    } catch (error) {
        return Response.json({message:"Something went wrong!"},{status:500})
    }
}

const signUp = async (req:Request)=>{
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

const logIn = async (req:Request)=>{
    const {email,password} = await req.json();
}