"use client"

import * as React from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { SlOptions } from "react-icons/sl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useToast } from "./ui/use-toast"
import { ImSpinner9 } from "react-icons/im"
import {usePathname} from "next/navigation"

type Props = {
    id: number;
    authorId: number;
}

export function OptionsButton({ id, authorId }: Props) {
    const { data: session } = useSession();
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<{ delete: boolean, hide: boolean }>({ delete: false, hide: false })
    const router = useRouter()
    const { toast } = useToast()
    const pathname = usePathname()

    useEffect(() => {
        const authorizationHandler = async () => {                     
            if (session?.user) {
                const res = await fetch(`/api/user?email=${session?.user?.email}`)
                const {user} = await res.json()
                if (authorId === user?.id) {
                    setAuthorized(true)
                }
                else {
                    setAuthorized(false)
                }
            }
            return
        }
        authorizationHandler()
    }, [authorId, session?.user])

    const deletePost = async () => {
        if (!authorized) return;
        setIsSubmitting(prev => ({ ...prev, delete: true }))
        const res = await fetch(`/api/post?id=${id}&email=${session?.user?.email}`, {
            method: "DELETE",
        })
        const data = await res.json()
        if (data.status === 200) {
            setOpen(false)
            toast({ title: "Deleted", description: "Your post has been deleted", duration: 3000 })
            pathname.includes(`/posts/${id}`) ? router.replace("/") : router.refresh()
            setIsSubmitting(prev => ({ ...prev, delete: false }))
        } else {
            toast({ title: "Oops!", description: "Something went wrong", duration: 3000, variant: "destructive" })
            setIsSubmitting(prev => ({ ...prev, delete: false }))
        }
    }
    const hidePost = async () => {
        setIsSubmitting(prev => ({ ...prev, hide: true }))
        const res = await fetch(`${process.env.BASE_URL}/api/post?id=${id}&email=${session?.user?.email}`, {
            method: "PATCH",
        })
        const data = await res.json()        
        if (data.status === 200) {
            setOpen(false)
            toast({ title: "Hide", description: "Your post has been hidden", duration: 3000 })
            pathname.includes(`/posts/${id}`) ? router.replace("/")  : router.refresh()
            setIsSubmitting(prev => ({ ...prev, hide: false }))
        } else {
            toast({ title: "Oops!", description: "Something went wrong", duration: 3000, variant: "destructive" })
            setIsSubmitting(prev => ({ ...prev, hide: false }))
        }
    }

    return (
        <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
                <Button className="bg-gray-100	rounded-full h-3.5 flex	items-center justify-center" size="icon">
                    <SlOptions className="w-8 h-5 text-gray-400" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40">
                <Button  disabled={isSubmitting.hide} variant="ghost" onClick={hidePost} >{isSubmitting.hide ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : "Hide"}</Button>
                {authorized && (
                <div className="grid place-items-baseline">
                        <Link className={`${buttonVariants({ variant: "ghost" })}`} href={`/posts/${id}/edit`}>Edit</Link>
                    <AlertDialog>
                            <AlertDialogTrigger className={`${buttonVariants({ variant: "ghost" })}`}>Delete</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your post
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction disabled={isSubmitting.delete} onClick={deletePost} className={buttonVariants({ variant: "destructive" })}>{isSubmitting.delete ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : "Continue"}</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
