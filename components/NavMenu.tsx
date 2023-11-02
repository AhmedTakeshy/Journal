"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { ModeToggler } from "./ModeToggler"
import SignoutButton from "./SignoutButton"
import { buttonVariants, Button } from "./ui/button"
import Image from "next/image"
import { ImSpinner9 } from "react-icons/im"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"


export default function NavMenu() {
    const { data: session, status } = useSession()
    const [open, setOpen] = useState<boolean>(false)
    const avatar = `https://ui-avatars.com/api/?name=${session?.user?.name}&background=random&rounded=true&size=128&font-size=0.50`;
    const image = session?.user?.image; 
    
    return (
        <div>
            <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                    <Button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="relative w-screen">
                    <div className="flex flex-col items-center mx-auto md:flex-row">
                        <NavigationMenu>
                            <NavigationMenuList className="flex flex-col items-center justify-center gap-2">
                                <NavigationMenuItem>
                                    <Link href="/" legacyBehavior passHref>
                                        <NavigationMenuLink onClick={() => setOpen(false) } className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/posts" legacyBehavior passHref>
                                        <NavigationMenuLink onClick={() => setOpen(false) } className={navigationMenuTriggerStyle()}>Posts</NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/profile" legacyBehavior passHref>
                                        <NavigationMenuLink onClick={() => setOpen(false) } className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <div className="flex flex-col w-full md:w-full md:hidden">
                            <div className="flex flex-col items-center justify-center gap-3 p-4 mt-4 font-medium rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:dark:bg-gray-900">
                                {status === "loading" && <ImSpinner9 className="ease-in-out animate-spin" size={25} />}
                                {
                                    session?.user ?
                                        <div className='flex items-center justify-center w-full gap-2'>
                                            <Image src={image && !image.includes("fbsbx") ? image : avatar} alt={`${session.user.name} pic`} width={35} height={35} className="hidden object-cover rounded-full md:inline-block" />
                                            <p className='w-2/4 p-2 text-center border rounded-lg md:border-none md:p-0 border-slate-900'>{session.user.name}</p>
                                        </div>
                                        :
                                        <Link onClick={() => setOpen(false) } href="/signin" className={`${buttonVariants({ variant: "outline" })} w-full`}>Sign in</Link>
                                }
                                <ModeToggler className="hidden md:inline-block" />
                                {session?.user && (<SignoutButton />)}
                            </div>
                        </div>

                    </div>
                </PopoverContent>
            </Popover>
            <NavigationMenu>
                <NavigationMenuList className="items-center justify-center hidden gap-2 md:flex">
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/posts" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Posts</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/profile" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>

    )
}