import { FaKhanda } from 'react-icons/fa';
import Link from 'next/link';
import { ModeToggler } from './ModeToggler';
import { buttonVariants } from './ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
export default async function Navbar() {
    const session = await getServerSession(authOptions)
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                <Link href="/" className="flex items-center">
                    <FaKhanda className="w-8 h-8 text-black dark:text-white " />
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <div className="flex flex-col p-4 mt-4 font-medium border rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 bg-gray-50 md:dark:bg-gray-900 dark:border-gray-700 md:items-center">
                        {
                            session?.user ?
                            <p>Welcome {session.user.name}</p>
                            :
                            <Link href="/signin" className={buttonVariants({ variant: "outline"})}>Sign in</Link>
                        }
                        {session?.user&&(<Link href="/api/auth/signout" className={buttonVariants({ variant: "outline"})}>Sign out</Link>)}
                        <ModeToggler/>
                    </div>
                </div>
            </div>
        </nav>
    )
}


