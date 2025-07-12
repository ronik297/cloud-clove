import { getServerSession } from "@/action/auth.action";
import db from "@/lib/database/db";
import { File } from "@/lib/database/schema/file.model";
import { Subscription } from "@/lib/database/schema/subscription.model";
import { pinata } from "@/lib/pinata/config";
import { getCategoryFromMimeType, parseError } from "@/lib/utils";
import { Hono } from "hono";
import { describe } from "node:test";

const fileRoute = new Hono()

fileRoute.get('/:page', async (c) => {
    try {
        await db();

        const category = c.req.param('page');
        const page = Number(c.req.query('page'));

        const session = await getServerSession();
        const FILE_SIZE = 9;

        if(!session) {
            return c.json({
                message: "Unauthorized",
                description: "You need to be logged in to upload files",
            }, {
                status: 401
            })
        }

        const { user: { id: userId, email: userEmail } } = session;

        // Handle shared files logic
        const totalFiles = await File.countDocuments({
            "userInfo.in": userId,
            category
        })

        const files = await File.find({
            "userInfo.id": userId,
            category
        }).skip((page - 1) * FILE_SIZE).limit(FILE_SIZE).sort({ createdAt: -1 }).lean();

        return c.json({
            message: "Successfull",
            description: "Files fetched successfully",
            data: {
                files: files,
                totalFiles,
                currentPage: page,
                totalPages: Math.ceil(totalFiles / FILE_SIZE),
            }
            }, {
                status: 200
            })

    } catch (error) {
        console.log('Error in fetching files', error);
        const err = parseError(error);

        return c.json({
            message: "Error",
            description: err,
            data: null
        }, {
            status: 500
        }) 
    }
})

fileRoute.post('/upload', async (c) => {
    try {
        await db()

        const data = await c.req.formData();
        const file: File | null = data.get('file') as unknown as File;

        const session = await getServerSession();

        if(!session) {
            return c.json({
                message: "Unauthorized",
                description: "You need to be logged in to upload files",
            }, {
                status: 401
            })
        }

        const userId = session.user.id;
        const name = session.user.name;
        const subscription = await Subscription.findOne({
            subscriber: userId
        })

        if(!subscription) {
            return c.json({
                message: "⚠️ Warning",
                category: null,
                description: "Subscription not found.",
            }, {
                status: 401
            })
        }

        if(subscription.subscriptionType !== "free" && subscription.status !== "activated") {
            return c.json({
                message: "⚠️ Warning",
                category: null,
                description: "Your subscription is expired. Please re-subscribe to continue." as string,
            }, {
                status: 400
            })
        }

        if(subscription.selectedStorage <= subscription.usedStorage) {
            return c.json({
                message: "⚠️ Warning",
                category: null,
                description: "Storage limit exceeded. Please subscribe and select additional storage." as string,
            }, {
                status: 400
            })
        }

        const uploadData = await pinata.upload.public.file(file).keyvalues({
            userId, 
            name
        })

        const category = getCategoryFromMimeType(uploadData.mime_type)  

        await File.create({
            pinataId: uploadData.id,
            name: uploadData.name,
            mimeType: uploadData.mime_type,
            cid: uploadData.cid,
            size: uploadData.size,
            userInfo: {
                id: userId,
                name
            },
            category,
        })

        await Subscription.updateOne({
            subscriber: userId 
        },
        {
            $inc: {
                usedStorage: uploadData.size
            }
        })  

        return c.json({
            message: "Upload Successful",
            category,
            description: `File: ${uploadData.name}`,
        },
        {
            status: 201
        }) 

    } catch (error) {
        console.log('Error in file uploading', error);

        const err = parseError(error);

        return c.json({
            message: "Error",
            description: err
        }, 
        {
            status: 500    
        })
    }
})

export default fileRoute;