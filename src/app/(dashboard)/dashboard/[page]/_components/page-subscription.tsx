"use client";

import { getSubscription } from '@/action/subscription.action'
import { StorageCard, SubscriptionCancellationWidget } from '@/app/(dashboard)/_components/subscription/subs-widget'
import { P } from '@/components/custom/p'
import { ISubscription } from '@/lib/database/schema/subscription.model'
import { APP_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXT_PUBLIC_PADDLE_CLIENT_TOKEN, PADDLE_API_KEY, PADDLE_PRODUCT_ID, PADDLE_SUBSCRIPTION_WEBHOOK_SECRET_KEY } from '@/lib/env';
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const SubscriptionPage = () => {
    const { data: subscription, isLoading, error } = useQuery({
        queryKey: ['subscription'],
        queryFn: getSubscription,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    if(error) return <P weight="bold" size="large">{error.message}</P>

  return (
    <div className='space-y-6'>
        <StorageCard subs={subscription?.data as ISubscription} isLoading={isLoading} />
        <SubscriptionCancellationWidget subs={subscription?.data as ISubscription} isLoading={isLoading} />
    </div>
  )
}

export default SubscriptionPage