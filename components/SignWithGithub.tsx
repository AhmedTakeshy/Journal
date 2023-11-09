"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { signIn } from "next-auth/react"
export default function SignWithGithub() {
  return (
    <>
      <div className="flex items-center justify-center !mt-6 md:justify-between">
        <div className="block w-5/12 h-px dark:bg-gray-300 bg-slate-800"></div>
        <p className="mx-2 text-sm font-semibold dark:text-gray-400 text-slate-900">OR</p>
        <div className="block w-5/12 h-px dark:bg-gray-300 bg-slate-800"></div>
      </div>
      <Button onClick={() => signIn("google", { callbackUrl: `/` })} className="w-full my-2 text-black bg-white">
        <Image className='mr-3' loading="lazy" height={24} width={24} src="https://authjs.dev/img/providers/google.svg" alt="Github logo" />
        <span>Sign in with Google</span>
      </Button>
      <div className="flex flex-wrap items-center justify-between my-2 sm:gap-4">
        <Button  onClick={() => signIn("facebook", {callbackUrl: `/`})} className="w-full my-2 text-black bg-white">
          <Image className='mr-3' loading="lazy" height={24} width={24} src="https://authjs.dev/img/providers/facebook.svg" alt="Github logo" />
          <span>Sign in with Facebook</span>
        </Button>

        <Button  onClick={() => signIn("instagram", {callbackUrl: `/`})} className="w-full my-2 text-black bg-white">
          <Image className='mr-3' loading="lazy" height={24} width={24} src="https://authjs.dev/img/providers/instagram.svg" alt="Github logo" />
          <span>Sign in with Instagram</span>
        </Button>
      </div>
        <Button onClick={() => signIn("github", {
        callbackUrl: `/`
      })} className="w-full my-2 text-black bg-slate-700">
        <Image className='mr-3' loading="lazy" height={24} width={24} src="https://authjs.dev/img/providers/github.svg" alt="Github logo" />
        <span>Sign in with GitHub</span>
      </Button>
    </>
  )
}
