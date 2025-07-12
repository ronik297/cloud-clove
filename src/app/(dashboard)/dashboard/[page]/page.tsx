import { generatePageKey } from '@/lib/utils';
import React from 'react'
import PageFiles from './_components/page-files';

interface Props {
    params: Promise<{page: "subscription" | "documents" |"images" | "videos" | "others" | "shared"}>;
}


const Page = async ({ params }: Props) => {
    const page = (await params).page;
    const key = generatePageKey(page);

  return (
    <>
      <h1 className='capitalize'>
        {page}
      </h1>
      <br />
      <PageFiles page={key} />
    </>
  )
}

export default Page