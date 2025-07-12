import { Button } from '@/components/ui/button'
import { RiFileAddFill } from '@remixicon/react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const UploadButton = () => {
    const pathname = usePathname();
    const queryClient = useQueryClient();
    const [fileProgress, setFileProgress] = useState<Record<string, number>>()
    const [isUploading, setIsUploading] = useState(false)

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files ? Array.from(e.target.files) : [];

        if(!files.length) {
            toast("No file selected", {
                description: "Please select a file to upload",
            });

            return;
        }

        const progressMap: Record<string, number> = {}

        files.forEach(file => {
            progressMap[file.name] = 0;
        })

        setFileProgress(progressMap);
        console.log("progressMap:", progressMap);
    }

  return (
    <>
        <Button onClick={() => {
            document.getElementById('file-upload')?.click()
        }}>
            <RiFileAddFill /> Upload
        </Button>
        <input type='file' className='hidden' id="file-upload" 
        multiple
        onChange={handleFileChange} />
    </>
  )
}

export default UploadButton