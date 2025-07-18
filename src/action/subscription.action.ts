"use server";

import db from "@/lib/database/db";
import { getServerSession } from "./auth.action";
import { Subscription } from "@/lib/database/schema/subscription.model";
import { ActionResponse } from "@/lib/utils";

export async function getSubscription() {
  try {
    await db();

    const session = await getServerSession();

    if (!session) {
      throw new Error("Unauthorized user");
    }

    const {
      user: { id },
    } = session;

    const subs = await Subscription.findOne({ subscriber: id });

    return ActionResponse({
      message: "Subscription retrieved successfully",
      description: "Subscription details fetched",
      data: subs,
      status: 200,
    });
  } catch (error) {
    console.log("Error in getting subscription: ", error);

    throw error;
  }
}