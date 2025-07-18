"use server"

import db from "@/lib/database/db";
import { ISubscription, Subscription } from "@/lib/database/schema/subscription.model";
import { getServerSession } from "./auth.action";
import axios from "axios";
import { PADDLE_API_KEY, PADDLE_PRODUCT_ID } from "@/lib/env";
import { ActionResponse, formatFileSize, parseError } from "@/lib/utils";
import paddle from "@/lib/paddle/config";
import { STORAGE_PRICING } from "@/lib/constants";

const paddleBaseUrl = `https://${process.env.NODE_ENV !== "production" ? "sandbox-" : ""}api.paddle.com/`;

const effectiveFrom = `${process.env.NODE_ENV === "production" ? "next_billing_period" : "immediately"}`;

export async function cancelSubscription(subs: ISubscription) {

    try {
        await db();

        const session = await getServerSession();

        if(!session) {
            throw new Error("Unauthorized user");
        }

        const { gateway } = subs;

        const paddleSubscriptionCancellationUrl = `${paddleBaseUrl}/subscriptions/${gateway?.paddle.subscription.id}/cancel`;

        const res = await axios.post(paddleSubscriptionCancellationUrl, {
            "effective_from": effectiveFrom,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PADDLE_API_KEY}`,
            }
        });

        return ActionResponse({
            message: "Subscription cancelled successfully",
            description: "Your subscription has been cancelled. You will not be charged in the next billing cycle.",
            status: res.status,
        })
    } catch (error) {
        console.log("Error in cancelling subscription: ", error);
        const err = parseError(error);

        return ActionResponse({
            message: "Error in cancelling subscription",
            description: err,
            status: 500,
        });

    }

}

export async function createPaddlePrice(storage: number, storageInByte: number) {
    try {
        const session = await getServerSession();
        const formattedStorage = formatFileSize(storageInByte)

        if(!session) {
            throw new Error("Unauthorized user");   
        }

        const price = await paddle.prices.create({
            name: `Storage-${formattedStorage}`,
            productId: PADDLE_PRODUCT_ID,
            billingCycle: {
                interval: "month",
                frequency: 1,
            },
            taxMode: "external",
            description: `Price for storage ${formattedStorage} for user ${session.user.email}`,
            unitPrice: {
                amount: Math.trunc((storage * STORAGE_PRICING * 100)).toString(),
                currencyCode: "USD",
            },
            quantity: {
                minimum: 1,
                maximum: 999,
            }
        });

        await Subscription.updateOne(
            { subscriber: session.user.id },
            {
                "gateway.paddle.priceId": price.id,
                "gateway.provider": "paddle",
            }
        );

        return ActionResponse({
            message: "Price created successfully",
            description: "Price for additional storage created successfully",
            data: price,
            status: 201,
            user: session.user,
        });

    } catch (error) {
        console.log("Error in creating paddle price: ", error);
        const err = parseError(error);

        return ActionResponse({
            message: "Error in creating price",
            description: err,
            status: 500,
            data: null,
            user: null,
        });   
    }
}