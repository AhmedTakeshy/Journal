import { FaKhanda } from 'react-icons/fa';
import Link from 'next/link';
import { ModeToggler } from './ModeToggler';
import { Button, buttonVariants } from './ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SignoutButton from './SignoutButton';
import NavMenu from './NavMenu';
import Image from 'next/image';




export default async function Navbar() {
    const session = await getServerSession(authOptions)
    return (
        <nav className="bg-slate-200 dark:bg-gray-900">
            <div className="relative flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                <Link href="/" className="flex items-center">
                    <FaKhanda className="w-8 h-8 text-black dark:text-white " />
                </Link>
                <div className='flex items-center justify-end gap-3'>
                    <ModeToggler className="md:hidden " />
                    <NavMenu />
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <div className="flex flex-col p-4 mt-4 font-medium border rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:items-center">
                        {
                            session?.user ?
                            <div className='flex items-center justify-center gap-2'>
                                    <Image src={session?.user.image ?? `https://ui-avatars.com/api/?name=${session.user.name}&background=random&rounded=true&size=128&font-size=0.50`} alt="user" width={35} height={35} className="object-cover rounded-full" />
                                    <p>{session.user.name}</p>
                                </div>
                                :
                                <Link href="/signin" className={buttonVariants({ variant: "outline" })}>Sign in</Link>
                            }
                        {session?.user && (<SignoutButton />)}
                            <ModeToggler className="md:inline-flex " />
                    </div>
                </div>
            </div>
        </nav>
    )
}


