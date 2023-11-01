"use client"
import { FcAddImage } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { set, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { ChangeEvent, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import { ImSpinner9 } from "react-icons/im"


type Props = {
    method: string;
    data?: Post;
}

export default function PostForm({ method, data }: Props) {
    const { data: session } = useSession()
    const [open, setOpen] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(0);
    const router = useRouter()


    const formSchema = z.object({
        title: z.string().min(5, "Please enter a valid title."),
        topic: z.string(),
        content: z.string().min(10, "Description must be at least 10 characters.").max(500, "Description can't be more than 500 characters.")
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data?.title ?? "",
            topic: data?.topic ?? "",
            content: data?.content ?? "",
        },
    })



    const writingCounter = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setCounter((prev) => prev = e.target.value.length);
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        let url = "http://localhost:3000/api/post"
        if(method === "PUT") url += `?id=${data?.id}`
        try {
            const respond =
                await fetch(url, {
                    method,
                    body: JSON.stringify({
                        title: values.title,
                        topic: values.topic,
                        content: values.content,
                        authorEmail: session?.user?.email,
                        published: true,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            const res = await respond.json()
            console.log(res)
            if (res.status === 201 || res.status === 200) {
                toast({
                    title: "Success!",
                    description: `Your post has been ${method === "POST" ? "published" : "updated"}.`,
                    duration: 3000,
                })
                form.reset()
                setIsSubmitting(false)
                setOpen(false)
                router.push(`/posts${method === "POST" ? "" : res.post.id}`)
                router.refresh()
            }
        } catch (error) {
            toast({
                title: "Oops!",
                description: "Something went wrong, please try again later.",
                duration: 3000,
                variant: "destructive",
            })
            setIsSubmitting(false)
        }
    }
    return (
        method === "POST" ? (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='w-3/4'>Write a post.</Button>
                </DialogTrigger>
                <DialogContent>
                    <div className='w-full max-w-screen-md border-2 rounded-xl'>
                        <div className="flex flex-col justify-start p-4 space-y-4 rounded-md shadow-lg ">
                            <Form {...form}>
                                <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl >
                                                    <Input spellCheck placeholder="What do you feel?" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="topic"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Topic</FormLabel>
                                                <FormControl>
                                                    <Input spellCheck placeholder="Maybe something create" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    <Textarea itemType="string" spellCheck={true} className='h-20' placeholder="A description can change the world...." {...field}
                                                        onChange={(e) => { field.onChange(e); writingCounter(e) }} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex w-full m-2 text-gray-500">
                                        <div className="relative inset-0 flex items-center justify-start w-2/4 gap-2 group">
                                            <FcAddImage className="w-12 h-12 p-1 mr-2 cursor-pointer hover:text-gray-700" />
                                            {/* <input hidden type="file" multiple onChange={changeHandler} x-ref="fileInput"/> */}
                                            <p className='absolute transition-all duration-500 opacity-0 group-hover:opacity-100 left-10 group-hover:left-16'>Click here to upload images</p>
                                        </div>
                                        <div className={`ml-auto text-xs font-semibold  ${counter <= 500 ? "text-gray-400" : "text-red-500"}`}>{counter}/500</div>
                                    </div>
                                    <div className="flex justify-end buttons">
                                        <Button disabled={isSubmitting} type='submit' size="lg" className="ml-2 text-gray-200 transition duration-500 bg-indigo-500 border border-indigo-500 hover:bg-transparent">{isSubmitting ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : "Post"}</Button>
                                    </div>
                                </form>
                            </Form>
                        </div >
                    </div >
                </DialogContent>
            </Dialog>) :
            <div className='w-full mt-12 border-2 rounded-xl '>
                <div className="flex flex-col justify-start p-4 space-y-4 rounded-md shadow-lg ">
                    <Form {...form}>
                        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl >
                                            <Input spellCheck placeholder="What do you feel?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="topic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Topic</FormLabel>
                                        <FormControl>
                                            <Input spellCheck placeholder="Maybe something create" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea itemType="string" spellCheck={true} className='h-20' placeholder="A description can change the world...." {...field}
                                                onChange={(e) => { field.onChange(e); writingCounter(e) }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full m-2 text-gray-500">
                                <div className="relative inset-0 flex items-center justify-start w-2/4 gap-2 group">
                                    <FcAddImage className="w-12 h-12 p-1 mr-2 cursor-pointer hover:text-gray-700" />
                                    {/* <input hidden type="file" multiple onChange={changeHandler} x-ref="fileInput"/> */}
                                    <p className='absolute transition-all duration-500 opacity-0 group-hover:opacity-100 left-10 group-hover:left-16'>Click here to upload images</p>
                                </div>
                                <div className={`ml-auto text-xs font-semibold  ${counter <= 500 ? "text-gray-400" : "text-red-500"}`}>{counter}/500</div>
                            </div>
                            <div className="flex justify-end buttons">
                                <Button disabled={isSubmitting} type='submit' size="lg" className="ml-2 text-gray-200 transition duration-500 bg-green-500 border border-green-500 hover:bg-transparent">{isSubmitting ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : "Update"}</Button>
                            </div>
                        </form>
                    </Form>
                </div >
            </div >
    )
}
