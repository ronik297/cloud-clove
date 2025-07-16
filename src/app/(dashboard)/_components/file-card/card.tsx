import { IFile } from '@/lib/database/schema/file.model'
import { cn, dynamicDownload, formatFileSize } from '@/lib/utils';
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import FileMenu from './menu';
import { P } from '@/components/custom/p';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { generateUrl } from '@/action/file.action';

const FileCard = ({ file }: { file: IFile}) => {
  const [isLinkInProgress, setIsLinkInProgress] = useState(false);

  const { name, size, createdAt, userInfo, category } = file;

  const requiredName = name.length > 20 ? name.slice(0, 20) + '...' : name;

  const formattedSize = formatFileSize(size);
  
  return (
    <Card className='w-full max-h-60 border-none shadow-none drop-shadow-xl'>
      <CardHeader>
        <div className='flex items-start gap-4 justify-between'>
          <Avatar className='size-20 rounded-none'>
            <AvatarImage src={`/${category}.png`} />
            <AvatarFallback>{name.slice(0,2)}</AvatarFallback>
          </Avatar>
       
          <div className='flex flex-col items-end gap-4 justify-between w-full'>
            <FileMenu file={file} isLinkInProgess={isLinkInProgress} setIsLinkInProgress={setIsLinkInProgress} />
            <P>
              {formattedSize}
            </P>
          </div>
         </div>
      </CardHeader>
      <CardContent className='space-y-2'>
        <P size="large" weight="bold" className={cn(category === 'image' && 'cursor-pointer')}
        onClick={async () => {
          if(category === 'image') {
            setIsLinkInProgress(true);

            const { data, status } = await generateUrl(file.cid);

            if(status !== 201) {
              toast(`Error`, {
                description: `${data}`
              })

              setIsLinkInProgress(false);
              return;
            }

            setIsLinkInProgress(false);

            dynamicDownload(data as string, file.name)

          }
        }}
        >
          {requiredName}
        </P>
        <P size="small" variant="muted" weight="light">
          {format(createdAt, 'dd-MMM-yyyy')}
        </P>

        <P size="small" variant="muted" weight="light">
          Uploaded By: <b>{userInfo.name}</b>
        </P>
      </CardContent>
    </Card>
  )
}

export default FileCard