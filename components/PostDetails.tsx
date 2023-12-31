import Image from "next/image"

type Props = {
    img: string
    topic?: string
    title: string
    description: string
    author: {
        name: string
        avatar: string
    }
}

export default function PostDetails() {
    return (
        <>
            <div className="p-4 dark:bg-slate-700 bg-slate-300 md:p-8 rounded-xl">
                {/*<!--Banner image-->*/}
                {/* <Image
                width={551}
                height={320}
                alt={`post image`}
                    className="object-cover object-center w-full rounded-lg h-80"
                    src="https://images.unsplash.com/photo-1603349206295-dde20617cb6a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                /> */}

                {/*<!--Topic-->*/}
                <p className="mt-2 text-base font-semibold text-indigo-500">Science</p>
                {/*<!--Title-->*/}
                <h1
                    className="mt-1 text-xl font-semibold leading-none text-gray-900 capitalize truncate dark:text-gray-400"
                >
                    the life of albert einstein
                </h1>
                {/*<!--Description-->*/}
                <div className="max-w-full">
                    <p className="mt-1 text-base font-medium tracking-wide dark:text-gray-100 text-slate-800">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
                        vel soluta dolore id nesciunt eum nam ipsam, eveniet cupiditate sint
                        veritatis harum odit. Iste dignissimos, ad provident nulla
                        voluptatum ut.
                    </p>
                </div>
                <div className="flex items-center mt-20 space-x-2">
                    {/*<!--Author's profile photo-->*/}
                    <Image
                        width={551}
                        height={320}
                        alt={`post image`}
                        className="object-cover object-center w-10 h-10 rounded-full"
                        src="https://randomuser.me/api/portraits/men/54.jpg"
                    />
                    <div>
                        {/*<!--Author name-->*/}
                        <p className="font-semibold text-gray-900 dark:text-gray-400">Lugano Shabani</p>
                        <p className="text-sm font-semibold text-gray-500">
                            Feb 24,2021 &middot; 6 min read
                        </p>
                    </div>
                </div>
            </div>
            {/*<!--End of first card-->*/}

            {/*<!--Second Tag-->*/}
            <div className="p-4 dark:bg-slate-700 bg-slate-300 md:p-8 rounded-xl">
                {/*<!--Banner image-->*/}
                <Image
                    width={551}
                    height={320}
                    alt={`post image`}
                    className="object-cover object-center w-full rounded-lg h-80"
                    src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80
          "
                />
                {/*<!--Topic-->*/}
                <p className="mt-2 text-base font-semibold text-indigo-500">
                    Startup stories
                </p>
                {/*<!--Title-->*/}
                <h1
                    className="mt-1 text-xl font-semibold leading-none text-gray-900 capitalize truncate dark:text-gray-400"
                >
                    The rise of facebook
                </h1>
                {/*<!--Description-->*/}
                <div className="max-w-full">
                    <p className="mt-1 text-base font-medium tracking-wide dark:text-gray-100 text-slate-800">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
                        dignissimos repudiandae. Consequuntur minus ipsam repudiandae soluta
                        qui, recusandae obcaecati molestias commodi magnam nisi illo illum
                        quaerat aut maiores! Esse, aperiam!
                    </p>
                </div>
                <div className="flex items-center mt-20 space-x-2">
                    {/*<!--Author's profile photo-->*/}
                    <Image
                        width={551}
                        height={320}
                        alt={`post image`}
                        className="object-cover object-center w-10 h-10 rounded-full"
                        src="https://randomuser.me/api/portraits/men/54.jpg"
                    />
                    <div>
                        {/*<!--Author name-->*/}
                        <p className="font-semibold text-gray-900 dark:text-gray-400">Lugano Shabani</p>
                        <p className="text-sm font-semibold text-gray-500">
                            Feb 24,2021 &middot; 6 min read
                        </p>
                    </div>
                </div>
            </div>
            {/*<!--End of first card-->*/}

            {/*<!--Third  card-->*/}
            <div className="p-4 dark:bg-slate-700 bg-slate-300 md:p-8 rounded-xl">
                {/*<!--Banner image-->*/}
                <Image
                    width={551}
                    height={320}
                    alt={`post image`}
                    className="object-cover object-center w-full rounded-lg h-80" src="
        https://images.unsplash.com/photo-1580867532901-7e3707f178ce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=732&q=80"/>
                {/*<!--Topic-->*/}
                <p className="mt-2 text-base font-semibold text-indigo-500">Culture</p>
                {/*<!--Title-->*/}
                <h1
                    className="mt-1 text-xl font-semibold leading-none text-gray-900 capitalize truncate dark:text-gray-400"
                >
                    the life of masaai people from tanzania
                </h1>
                {/*<!--Description-->*/}
                <div className="max-w-full">
                    <p className="mt-1 text-base font-medium tracking-wide dark:text-gray-100 text-slate-800">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                        officiis aspernatur, modi nobis et neque quod asperiores laboriosam
                        ab. Magni fugit necessitatibus ducimus placeat assumenda perferendis
                        laborum quae aperiam minus.
                    </p>
                </div>
                <div className="flex items-center mt-20 space-x-2">
                    {/*<!--Author's profile photo-->*/}
                    <Image
                        width={551}
                        height={320}
                        alt={`post image`}
                        className="object-cover object-center w-10 h-10 rounded-full"
                        src="https://randomuser.me/api/portraits/men/54.jpg"
                    />
                    <div>
                        {/*<!--Author name-->*/}
                        <p className="font-semibold text-gray-900 dark:text-gray-400">Lugano Shabani</p>
                        <p className="text-sm font-semibold text-gray-500">
                            Feb 24,2021 &middot; 6 min read
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}