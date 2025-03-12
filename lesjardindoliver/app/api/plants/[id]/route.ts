import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const prisma = new PrismaClient();

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("📡 API Called: /api/plants/", params.id);
  const { id } = params;
  try {
    const plant = await prisma.plant.findUnique({
      where: { id: Number(id) },
    });

    if (!plant) {
      console.log("❌ Plant not found in database");
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
    }

    console.log("✅ Found plant:", plant);

    // Generate signed URL for the image
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: plant.src, // Ensure this key is correct
    });

    const signedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 });

    console.log("🔗 Generated Signed URL:", signedUrl);

    return NextResponse.json({ ...plant, signedUrl }, { status: 200 });

  } catch (error) {
    console.error("❌ Error fetching plant:", error);
    return NextResponse.json({ error: 'Error fetching plant' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, src, description, advice, price } = await req.json();

  try {
    const updatedPlant = await prisma.plant.update({
      where: { id: Number(id) },
      data: { title, src, description, advice, price },
    });
    return NextResponse.json(updatedPlant, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating plant' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.plant.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting plant' }, { status: 500 });
  }
}