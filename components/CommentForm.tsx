"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'
import { BsSendFill } from 'react-icons/bs'
import { Button } from './ui/button'

export default function CommentForm() {

    const formSchema = z.object({
        content: z.string().min(1, "comment must be at least 1 character.")
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content:  "",
        },
    })
    return (
        <Form {...form}>
            <form action="" className='flex items-center justify-between w-11/12 px-4 overflow-hidden bg-gray-50 h-11 rounded-2xl relative '>
                <FormField
                
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className='flex justify-between items-center w-full h-full'>
                            <FormControl>
                                <Textarea itemType="string" spellCheck={true} className="text-black w-full min-h-fit h-full border-none ring-0 shadow-none outline-none bg-gray-50 focus-within:outline-none focus:outline-none focus-visible:outline-none" placeholder="Write your comment..." {...field}/>
                                {/* // try to remove the ring or outline around the textarea element */}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                    <Button type="submit" className=" bg-gray-100 hover:bg-gray-200 text-slate-500" size="icon">
                    <BsSendFill className=" " />
                    </Button>
            </form>
        </Form>
    )
}
