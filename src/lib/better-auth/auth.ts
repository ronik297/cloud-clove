import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import client from "./db";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../env";
import db from "../database/db";
import { Subscription } from "../database/schema/subscription.model";
import { ObjectId } from "mongodb";

const dbClient = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(dbClient),
    socialProviders: {
        google: { 
            clientId: GOOGLE_CLIENT_ID, 
            clientSecret: GOOGLE_CLIENT_SECRET, 
        }, 
    },
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            const newSession = ctx.context.newSession;
            const user = newSession?.user;

            if(newSession && user) {
                try {
                    await db();

                    const isSubscribed = await Subscription.findOne({
                        subscriber: user.id
                    })

                    if(isSubscribed) {
                        return;
                    }

                    const subscription = await Subscription.create({
                        subscriber: user.id,
                        status: "activated",
                    })

                    const users = dbClient.collection("users");
                    await users.updateOne(
                        { _id: new ObjectId(subscription.subscriber) },
                        { $set: { subscription: subscription._id } }
                    );
                } catch (error) {
                    console.error("Error in creating subscription in auth before hook:", error);
                    throw ctx.redirect("/sign-in");
                }
            }

        })
    },
    plugins: [nextCookies()] 
})