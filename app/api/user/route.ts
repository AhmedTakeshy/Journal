import { prisma } from "@/lib/prisma"
export async function POST(req:Request){
    try {
        const {username, email,password} = await req.json()
        const existedUserEmail = await prisma.user.findUnique({
            where: {
                email,

            }
        })
        const existedUserUsername = await prisma.user.findUnique({
            where: {
                username,

            }
        })
        if(existedUserEmail) return Response.json({message: "User with this email already exists", status: 400})
        if(existedUserUsername) return Response.json({message: "User with this username already exists", status: 400})
        if(!existedUserEmail && !existedUserUsername) {
            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password
                }
            })
            return Response.json({message: "User has been created successfully.", status: 200})
        }
    } catch (error) {
        console.error(error)
    }
}