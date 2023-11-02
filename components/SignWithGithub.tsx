"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { signIn } from "next-auth/react"
export default function SignWithGithub() {
  return (
    <>
      <div className="flex items-center justify-center !mt-6 md:justify-between">
        <div className="hidden w-5/12 h-px dark:bg-gray-300 bg-slate-800 md:block"></div>
        <p className="text-sm font-semibold dark:text-gray-400 text-slate-900 md:mx-2">OR</p>
        <div className="hidden w-5/12 h-px dark:bg-gray-300 bg-slate-800 md:block"></div>
      </div>
      <Button onClick={() => signIn("github", {
        callbackUrl: `/posts`
      })} className="w-full text-black bg-slate-700 my-2">
        <Image className='mr-3' loading="lazy" height={24} width={24} src="https://authjs.dev/img/providers/github.svg" alt="Github logo" />
        <span>Sign in with GitHub</span>
      </Button>

      <div className="flex items-center justify-between gap-4">
        <Button  onClick={() => signIn("facebook", {callbackUrl: `/posts`})} className="w-full text-black bg-white my-2">
          <Image className='mr-3' loading="lazy" height={24} width={24} src="https://authjs.dev/img/providers/facebook.svg" alt="Github logo" />
          <span>Sign in with Facebook</span>
        </Button>

        <Button  onClick={() => signIn("instagram", {callbackUrl: `/posts`})} className="w-full text-black bg-white my-2">
          <Image className='mr-3' loading="lazy" height={24} width={24} src="https://authjs.dev/img/providers/instagram.svg" alt="Github logo" />
          <span>Sign in with Instagram</span>
        </Button>
      </div>
        <Button  onClick={() => signIn("google", {callbackUrl: `/posts`})} className="w-full text-black bg-white my-2">
        <Image className='mr-3' loading="lazy" height={24} width={24} src="https://authjs.dev/img/providers/google.svg" alt="Github logo" />
          <span>Sign in with Google</span>
        </Button>
    </>
  )
}
