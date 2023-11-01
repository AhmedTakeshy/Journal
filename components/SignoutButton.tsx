"use client"
import {signOut} from "next-auth/react"
import { Button } from "./ui/button"
export default function SignoutButton() {
  return (
      <Button className="w-full md:w-auto" onClick={() => signOut({ callbackUrl: "${process.env.BASE_URL}" })} variant="destructive">Sign out</Button>
  )
}
