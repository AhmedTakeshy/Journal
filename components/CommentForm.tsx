"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'
import { BsSendFill } from 'react-icons/bs'
import { Button } from './ui/button'
import { ChangeEvent } from 'react'
import { toast } from './ui/use-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {
    id: number
}

export default function CommentForm({id}: Props) {

    const session = useSession()
    const router = useRouter()

    const autoResizeTextarea = (e:ChangeEvent<HTMLTextAreaElement>) => {
        if (e) {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const formSchema = z.object({
        content: z.string().min(1)
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    })


    const onSubmit = async(data: z.infer<typeof formSchema>) => {
        try {
            const respond = await fetch(`/api/post/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    content: data.content,
                    author: session.data?.user?.email
                })
            })
            const res = await respond.json()
            if (res.status === 200) {
                form.reset()
                toast({
                    title: "Success!",
                    description: `Your comment has been published.`,
                    duration: 3000,
                })
                router.refresh()
            }
        } catch (error) {
            toast({
                title: "Oops!",
                description: `Something went wrong.`,
                duration: 3000,
                variant: "destructive"
            })
        }
        
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center justify-between w-11/12 h-auto px-4 py-1 overflow-hidden rounded-2xl min-h-[2.5rem] bg-gray-50'>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className='w-full h-full'>
                            <FormControl>
                                <Textarea spellCheck={true} className="items-center w-full min-h-[1.25rem] h-5 p-0 overflow-hidden break-all whitespace-pre-line border-none shadow-none resize-none none text-slate-800 ring-0 bg-gray-50 focus-within:outline-none focus:outline-none focus-visible:ring-0" placeholder="Write your comment..." {...field} onChange={(e)=> {field.onChange(e); autoResizeTextarea(e)}}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="ml-2 bg-gray-100 hover:bg-gray-200 text-slate-500" size="icon">
                    <BsSendFill className="" />
                </Button>
            </form>
        </Form>
    )
}
