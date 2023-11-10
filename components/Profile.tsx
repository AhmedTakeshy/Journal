import { getServerSession } from 'next-auth'
import Image from 'next/image'


const getUser = async (email: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/user?email=${email}`);
    const data = await res.json();
    return data;
}

export default async function Profile() {
    const session = await getServerSession();
    const avatar = `https://ui-avatars.com/api/?name=${session?.user?.name}&background=random&rounded=true&size=256&font-size=0.50`;
    const image = session?.user?.image;
    const {posts, user} = await getUser(session?.user?.email!);
    return (
        <div className='w-full'>
            <section className="relative block h-[31rem]">
                <div className="absolute inset-0 w-full h-full bg-center bg-cover rounded-lg" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80")'}}>
                    <span id="blackOverlay" className="absolute w-full h-full opacity-50 dark:bg-black"></span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none h-70-px" style={{ transform: "translateZ(0px)" }}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="fill-current " points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            <section className="relative py-16">
                <div className="container px-4 mx-auto">
                    <div className="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white rounded-lg shadow-xl dark:bg-slate-700">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-between">
                                <div className="flex justify-center w-full px-4 lg:w-3/12 lg:order-2">
                                    <Image width={150} height={150} src={image && !image.includes("fbsbx") ? image : avatar} alt={`${session?.user?.name} pic`} className="relative left-0 object-contain w-32 h-32 max-w-xs border-none rounded-full shadow-xl bottom-16 "/>
                                </div>
                                {/* <div className="w-full px-4 lg:w-4/12 lg:order-3 lg:text-right lg:self-center">
                                    <div className="px-3 py-6 mt-32 sm:mt-0">
                                        <button className="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-md focus:outline-none sm:mr-2" type="button">
                                            Connect
                                        </button>
                                    </div>
                                </div> */}
                                <div className="w-full px-4 lg:w-4/12 lg:order-1">
                                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                                        <div className="p-3 mr-4 text-center">
                                            <span className="block text-xl font-bold tracking-wide uppercase text-blueGray-600">{posts.length}</span><span className="text-sm text-blueGray-400">Posts</span>
                                        </div>
                                        <div className="p-3 mr-4 text-center">
                                            <span className="block text-xl font-bold tracking-wide uppercase text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                                        </div>
                                        <div className="p-3 text-center lg:mr-4">
                                            <span className="block text-xl font-bold tracking-wide uppercase text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 text-center">
                                <h3 className="mb-2 text-4xl font-semibold leading-normal text-blueGray-700">
                                    {user.name}
                                </h3>
                                <div className="mt-0 mb-2 text-sm font-bold leading-normal uppercase text-blueGray-400">
                                    <i className="mr-2 text-lg fas fa-map-marker-alt text-blueGray-400"></i>
                                    {user.email}
                                </div>
                                <div className="mt-10 mb-2 text-blueGray-600">
                                    <i className="mr-2 text-lg fas fa-briefcase text-blueGray-400"></i>Solution Manager - Creative Tim Officer
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="mr-2 text-lg fas fa-university text-blueGray-400"></i>University of Computer Science
                                </div>
                            </div>
                            {/* <div className="py-10 mt-10 text-center border-t border-blueGray-200">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full px-4 lg:w-9/12">
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            An artist of considerable range, Jenna the name taken by
                                            Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                            performs and records all of his own music, giving it a
                                            warm, intimate feel with a solid groove structure. An
                                            artist of considerable range.
                                        </p>
                                        <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
