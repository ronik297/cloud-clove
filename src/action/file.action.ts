"use server";

import { TRenameFileForm, TShareFileForm } from "@/app/(dashboard)/_components/file-card/menu";
import db from "@/lib/database/db";
import { File, IFile } from "@/lib/database/schema/file.model";
import { pinata } from "@/lib/pinata/config";
import { ActionResponse, parseError } from "@/lib/utils";

export async function generateUrl(cid: string) {
    try {
        const gatewayUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`;

        return { data: gatewayUrl, status: 201 };
    } catch (error) {
        console.error("Error in generating files:", error);
        const err = parseError(error);

        return { data: `${err}`, status: 500 };
    }
}

export async function deleteFile(file: IFile) {
    try {
        await db();

        const { pinataId, category, _id } = file;

        await pinata.files.public.delete([pinataId]);
        await File.deleteOne({ pinataId });

        return { status: 200, category, fileId: _id };
    } catch (error) {
        console.error("Error in deleting file:", error);
        const err = parseError(error);

        return { data: `${err}`, status: 500 };
    }
}

export async function updateFilePermissions(file: IFile, values: TShareFileForm) {
    try {
        await db();

        const { pinataId, category } = file;
        const newPermission = {
            email: values.email,
            permissions: values.permissions,
        }

        const dbFiles = await File.findOne({
            pinataId
        }) as IFile;

        const { sharedWith } = dbFiles;

        const allPermission = sharedWith.filter(({ email }) => email !== values.email);

        const permissionToSave = [...allPermission, newPermission];

        await File.updateOne({
            $set: {
                sharedWith: permissionToSave
            }
        })

        return {
            message: `Shared with ${values.email}`,
            description: `${values.permissions}`,
            status: 200
        }

    } catch (error) {
        console.error("Error in updating file permissions:", error);
        const err = parseError(error);  

        return { message: "Error", description: err, status: 500 };
    }
}

export async function renameFile({
  file,
  values,
}: {
  file: IFile;
  values: TRenameFileForm;
}) {
  try {
    await db();

    const { pinataId } = file;

    const { name } = values;

    const updatedFile = await File.findOneAndUpdate(
      { pinataId },
      { name },
      { new: true } // Return the updated document
    );

    return ActionResponse({
      message: "Rename Successful",
      description: `New name: ${name}`,
      status: 200,
      file: updatedFile,
    });
  } catch (error) {
    console.log("Error in renaming file: ", error);
    const err = parseError(error);

    return ActionResponse({
      message: "Error",
      description: `${err}`,
      status: 500,
      file: null,
    });
  }
}