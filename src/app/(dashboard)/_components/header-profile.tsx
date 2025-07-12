import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { signOut, useSession } from '@/lib/better-auth/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { paragraphVariants } from '@/components/custom/p';
import { RiLogoutCircleFill } from '@remixicon/react';

const HeaderProfile = () => {
  const session = useSession();
  const router = useRouter();

  const { isPending, data } = session;

  if(isPending) {
    return <Skeleton className='size-10 rounded-full' />
  }

  if(!isPending) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={data?.user?.image as string} />
                <AvatarFallback>{(data?.user?.name as string)?.slice(0,1)}</AvatarFallback>
              </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='px-2'>
            <DropdownMenuLabel className={cn(paragraphVariants({ size: "medium", weight: "medium"}))}>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex items-center justify-center gap-2 px-3 py-4' onClick={async () => {
              await signOut(); 
              router.push('/sign-in')
              }}> 
                <RiLogoutCircleFill />
                <span className={cn(paragraphVariants({
                  size: "small", weight: "medium"
                }))}>
                  Logout
                </span>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }

}

export default HeaderProfile