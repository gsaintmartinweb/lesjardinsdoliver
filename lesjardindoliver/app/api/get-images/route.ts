import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Prefix: "", // Optional: Filter by folder or prefix
    });


    const { Contents } = await s3.send(command);

    if (!Contents) {

      return NextResponse.json({ images: [] });
    }


    // Generate signed URLs for each image
    const imageUrls = await Promise.all(
      Contents.map(async (item) => {
        if (!item.Key) return null; // Skip if no key
        const getObjectCommand = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: item.Key,
        });
        const signedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 });
        return signedUrl;
      })
    );

    // Filter out null values
    const validImageUrls = imageUrls.filter((url) => url !== null);


    return NextResponse.json({ images: validImageUrls });
  } catch (error) {
    console.error("Error listing images:", error);
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
  }
}
