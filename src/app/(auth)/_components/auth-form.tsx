'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { P, paragraphVariants } from '@/components/custom/p'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RiGoogleFill, RiLoader3Fill } from '@remixicon/react'
import { authClient } from '@/lib/better-auth/auth-client'
import { toast } from 'sonner'

interface Props {
    action: "Sign Up" | "Sign In";
}

const AuthForm = ({ action }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

  return (
   <Card className='w-96 drop-shadow-2xl'>
        <CardHeader>
            <CardTitle className={paragraphVariants({size: "large", weight: "bold"})}>{action}</CardTitle>
            <CardDescription>{action} to access your account</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3 '>
            <Button variant='lift' 
            disabled={isLoading}
            className='cursor-pointer' onClick={async () => {
                await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/dashboard"
                }, {
                    onSuccess: () => {
                        toast.success("Success", {
                            description: `redirecting to sign in page`,
                        })
                    },
                    onError: (c) => {
                        toast.error("Error", {
                            description: c.error.message || "An error occurred while signing in with google",
                        })
                    },
                    onRequest: () => {
                        setIsLoading(true);
                    },
                    onResponse: () => {
                        setIsLoading(false);
                    }
                })
            }}>
                {!isLoading ? <RiGoogleFill /> : <RiLoader3Fill className='animate-spin' />}
                {action} with google
            </Button>
            <P variant="muted" size="small" weight="light" className='w-full text-center'>
                {
                    action === "Sign Up" ? 
                    <>
                        Already have an account? 
                        <Link href="/sign-in" className='link ml-1'>
                            Sign In
                        </Link> 
                    </>
                    
                    : 
                    <>
                        Don&apos;t have an account? 
                        <Link href='sign-up' className='link ml-1'>
                            Sign Up
                        </Link>
                    </>
                    
                }
            </P>
        </CardContent>
    </Card>
  )
}

export default AuthForm