"use server";

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "../lib/prisma";

// Initialize AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getPlantById(id: number) {
  if (!id) throw new Error("Plant ID is required");

  try {
    // Fetch plant from database
    const plant = await prisma.plant.findUnique({
      where: { id },
    });

    if (!plant) {
      return { success: false, message: "Plant not found" };
    }

    // Generate signed URL for plant image in S3
    let signedUrl = "";
    if (plant.src) {
      const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: plant.src, 
      });

      signedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 });
    }

    return {
      success: true,
      plant: { ...plant, signedUrl },
    };
  } catch (error) {
    console.error("Error fetching plant:", error);
    return { success: false, message: "Error fetching plant" };
  }
}