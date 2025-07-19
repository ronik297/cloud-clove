import db from "@/lib/database/db";
import { PADDLE_SUBSCRIPTION_WEBHOOK_SECRET_KEY } from "@/lib/env";
import paddle from "@/lib/paddle/config";
import { Hono } from "hono";
import { EventName } from "@paddle/paddle-node-sdk";
import { Subscription } from "@/lib/database/schema/subscription.model";

const paddleRoute = new Hono();

interface CustomData {
  customData: {
    entityType: string;
    customer: {
      id: string;
      email: string;
      entityType: "customer";
      extraStorageInByte: number;
      extraStorageInGB: number;
    };
  };
}

paddleRoute.post("/paddle/subscription", async (c) => {
   try {
        await db();

        const signature = c.req.header("paddle-signature");

        const rawRequestBody = await c.req.text();

        const secretKey = PADDLE_SUBSCRIPTION_WEBHOOK_SECRET_KEY;

        if (signature && rawRequestBody) {
            // The  `unmarshal` function will validate the integrity of the webhook and return an entity
            const eventData = await paddle.webhooks.unmarshal(rawRequestBody, secretKey, signature);
            if (eventData.eventType) {

               if(EventName.SubscriptionActivated) {
                   const customData = (eventData.data as CustomData)?.customData;

                   const userId = customData?.customer.id;
                   const extraStorageInByte = customData.customer.extraStorageInByte;

                    await Subscription.updateOne({ subscriber: userId }, {
                        subscriptionType: "paid",
                        status: "active",
                        "gateway.paddle.subscription.id": eventData.data.id,
                        "gateway.paddle.subscription.entityType": eventData.eventType,
                        $inc: {
                            selectedStorage: extraStorageInByte,
                        }
                    })

                    return c.json({
                        success: true,
                        message: `Subscription ${eventData.data.id} was activated`
                    }, { status : 200 });
               }

               if(EventName.SubscriptionCanceled) {
                   const customData = (eventData.data as CustomData)?.customData;

                   const userId = customData?.customer.id;
                  

                    await Subscription.updateOne({ subscriber: userId }, {
                        status: "canceled",
                        subscriptionType: "free",
                        "gateway.paddle.subscription.entityType": eventData.eventType,
                    })

                    return c.json({
                        message: `Subscription ${eventData.data.id} was canceled`,
                    }, { status : 200 });
               }

               return c.json({}, { status: 200 });

            }
        } else {
            throw new Error('Signature missing in header');
        }
   } catch (error) {
       console.error(error);
       return c.json({
           message: error instanceof Error ? error.message : 'An error occurred while processing the webhook',
       }, { status: 400 });
   }
});

export default paddleRoute;
