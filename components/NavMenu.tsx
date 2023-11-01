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
                <PopoverContent className="w-screen relative">
                    <div className="flex flex-col items-center md:flex-row mx-auto">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-2 flex-col flex items-center justify-center">
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
                        <div className=" md:w-full md:hidden flex flex-col w-full">
                            <div className="flex flex-col justify-center p-4 mt-4 font-medium  rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:dark:bg-gray-900  items-center gap-3">
                                {status === "loading" && <ImSpinner9 className="ease-in-out animate-spin" size={25} />}
                                {
                                    session?.user ?
                                        <div className='flex w-full items-center justify-center gap-2'>
                                            <Image src={session?.user.image ?? `https://ui-avatars.com/api/?name=${session.user.name}&background=random&rounded=true&size=128&font-size=0.50`} alt="user" width={35} height={35} className="object-cover rounded-full hidden md:inline-block" />
                                            <p className='border md:border-none p-2 md:p-0 border-slate-900 rounded-lg w-2/4 text-center'>{session.user.name}</p>
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
                <NavigationMenuList className="gap-2 hidden md:flex items-center justify-center">
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