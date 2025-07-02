import React from 'react'

interface Props {
    params: Promise<{page: "subscription" | "documents" |"images" | "videos" | "others" | "shared"}>;
}


const Page = async ({ params }: Props) => {
    const page = (await params).page;
  return (
    <div>{page}</div>
  )
}

export default Page