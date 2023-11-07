"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'
import { BsSendFill } from 'react-icons/bs'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ChangeEvent, SetStateAction, useState } from 'react'

export default function CommentForm() {
    const [comment, setComment] = useState<string>("")

    const formSchema = z.object({
        content: z.string().min(1, "comment must be at least 1 character.")
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    })


    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='relative flex items-center justify-between w-11/12 h-auto px-4 py-2 overflow-hidden rounded-lg min-h-[2.5rem] bg-gray-50'>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start justify-center w-full h-full'>
                            <FormControl>
                                    <Textarea data-text="Write your comment..." spellCheck={true} className="w-full h-auto p-0 break-all whitespace-pre-line border-none shadow-none none text-slate-800 ring-0 bg-gray-50 focus-within:outline-none focus:outline-none focus-visible:ring-0" placeholder="Write your comment..." {...field}/>
                            </FormControl>
                            <FormMessage />
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
