import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center mt-24 h-[70vh]">
      <div className="mx-auto rounded-full dark:bg-cyan-700 blur-[90px] absolute  w-80 h-80 z-[-1] animate-pulse" >
      </div>
      <h1 className="mb-4 text-3xl font-bold">Try it now for free.</h1>
      <p className="w-full max-w-[30rem]">Here you can express all you feelings without any restrictions. <Link href="/posts/writeitdown" className="text-xl font-semibold uppercase transition-all duration-500 hover:text-teal-700 text-cyan-500 hover:tracking-[.5rem]">Post it now.</Link></p>
    </div>
  )
}
