"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import SignWithGithub from "./SignWithGithub"
import { useRouter } from "next/navigation"
import {useToast} from "./ui/use-toast"



const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
})
export function SignInForm() {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter()
    const {toast} = useToast()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const signInData = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        })
        console.log(signInData)
        if (signInData?.status === 200) {
            router.refresh()
            router.replace("/admin")
        }
        if (signInData?.status === 401) {
            toast({
                title: "Oops!",
                description: "Email or password is incorrect.",
                variant: "destructive",
                duration: 5000,
            })
        }
    }

    return (
        <Form {...form} >
            <div className="p-4 space-y-2 border-2 rounded-md border-slate-800 dark:border-slate-400">
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="*******" {...field} type={`${showPassword ? "text" : "password"}`} />
                                        {showPassword ?
                                            <PiEyeBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`}
                                                onClick={() => setShowPassword(false)} /> :
                                            <PiEyeClosedBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`} onClick={() => setShowPassword(true)} />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full !mt-4">Sign In</Button>
                </form>
                <SignWithGithub />
                <p>If you don&apos;t have an account, please <Link href="/signup" className="text-blue-500 hover:text-blue-700">Sign up</Link></p>
            </div>
        </Form>
    )
}
