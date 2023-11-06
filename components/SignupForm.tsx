"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { useRouter } from "next/navigation"
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useState, useTransition } from "react"
import Link from "next/link"
import SignWithGithub from "./SignWithGithub"
import { useToast } from "./ui/use-toast"
import { ImSpinner9 } from "react-icons/im"



const formSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
})
export function SignUpForm() {
    const { toast } = useToast()

    const [showPassword, setShowPassword] = useState<{ password: boolean, confirmPassword: boolean }>
        ({
            password: false,
            confirmPassword: false
        });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const router = useRouter()



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        const res = await fetch(`/api/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email.toLowerCase(),
                password: values.password,
            })
        })
        const message = await res.json()
        if (res.status === 201) {
            toast({
                title: "Success!",
                description: "Your account has been created.",
                duration: 3000,
            })
            form.reset();
            setIsSubmitting(false)
            router.replace("/signin")
        }
        if (res.status === 409) {
            toast({
                title: "Oops!",
                description: message.message,
                duration: 3000,
                variant: "destructive"
            })
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form} >
            <div className="w-full p-4 space-y-2 border-2 rounded-md border-slate-800 dark:border-slate-400">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ahmed Takeshy" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                        <Input placeholder="*******" {...field} type={`${showPassword.password ? "text" : "password"}`} />
                                        {showPassword.password ?
                                            <PiEyeBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`}
                                                onClick={() => setShowPassword(prevState => ({ ...prevState, password: false }))} /> :
                                            <PiEyeClosedBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`} onClick={() => setShowPassword(prevState => ({ ...prevState, password: true }))} />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="*******" {...field} type={`${showPassword.confirmPassword ? "text" : "password"}`} />
                                        {showPassword.confirmPassword ?
                                            <PiEyeBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`}
                                                onClick={() => setShowPassword(prevState => ({ ...prevState, confirmPassword: false }))} /> :
                                            <PiEyeClosedBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`} onClick={() => setShowPassword(prevState => ({ ...prevState, confirmPassword: true }))} />}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full !mt-4">{isSubmitting ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : "Sign Up"}</Button>
                </form>
                <SignWithGithub />
            </div>

        </Form>
    )
}
