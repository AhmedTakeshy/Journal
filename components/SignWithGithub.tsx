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
      <Button onClick={() => signIn("github")} className="w-full text-black bg-slate-700">
        <Image className='mr-3' loading="lazy" height={24} width={24} src="https://authjs.dev/img/providers/github.svg" alt="Github logo" />
        <span>Sign in with GitHub</span>
      </Button>
    </>
  )
}
