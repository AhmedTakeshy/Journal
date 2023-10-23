"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    useFormField,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useState } from "react"



export function SignUpForm() {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { formState: { isValid,isSubmitted,errors } } = useForm();
    console.log(isValid,isSubmitted,errors.root);

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
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
       
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        const response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        const res = await response.json()
        if (res.status === 201) {
            form.reset();
            redirect("/")
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative p-4 space-y-2 border-2 rounded-md border-slate-800 dark:border-slate-400">
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
                                <Input placeholder="*******" {...field} type={`${showPassword ? "text" : "password"}`} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {showPassword ?
                    <PiEyeBold
                        className={`hover:cursor-pointer absolute right-[15%] ${isValid ? "bottom-[28%]" : "bottom-[30%]"}`}
                        onClick={() => setShowPassword(false)} /> :
                    <PiEyeClosedBold
                        className={`hover:cursor-pointer absolute right-[15%] ${isValid ? "bottom-[28%]" : "bottom-[30%]"}`} onClick={() => setShowPassword(true)} />}
                <Button type="submit" className="w-full !mt-4">Sign Up</Button>
            </form>
        </Form>
    )
}
