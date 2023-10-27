"use client"
import { FcAddImage } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { ChangeEvent, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function PostForm() {
    const { data: session } = useSession()

    const formSchema = z.object({
        title: z.string().min(5, {
            message: "Please enter a valid title.",
        }),
        topic: z.string(),
        content: z.string().min(10, {
            message: "Description must be at least 10 characters.",
        }).max(500, {
            message: "Description can't be more than 500 characters.",
        })
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            topic: "",
            content: "",
        },
    })

    const [counter, setCounter] = useState<number>(0);

    const writingCounter = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setCounter(prev => prev = e.target.value.length);
    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: data.title,
                topic: data.topic,
                content: data.content,
                authorEmail: session?.user?.email,
                published: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const result = await res.json()
        console.log(result)
    }

    return (
        <div className='max-w-screen-md w-full'>
            <h1 className="my-6 ml-4 text-2xl font-bold text-left heading">New Post</h1>
            <div className="flex flex-col justify-start  p-4 space-y-4 rounded-md shadow-lg ">
                <Form {...form}>
                    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
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
                                        <Textarea spellCheck={true} className='h-20' placeholder="A description can change the world...." {...field}
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
                            <Button type='submit' size="lg" className="ml-2 text-gray-200 transition duration-500 bg-indigo-500 border border-indigo-500 hover:bg-transparent">Post</Button>
                        </div>
                    </form>
                </Form>
            </div >
        </div >
    )
}
