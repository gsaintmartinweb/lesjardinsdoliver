import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import AWS from "aws-sdk";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const parseForm = (req: any): Promise<{ fields: any; files: any }> => {
  const form = new IncomingForm({ keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
};

export async function POST(req: Request) {
  try {
    const buffer = await req.arrayBuffer();
    const readable = Readable.from(Buffer.from(buffer));

    const nodeReq = Object.assign(readable, {
      headers: Object.fromEntries(req.headers.entries()),
      method: req.method,
      url: req.url,
    });

    const { fields, files } = await parseForm(nodeReq);
    console.log("Parsed fields:", fields);
    console.log("Parsed files:", files);

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file || !file.filepath) {
      throw new Error("Uploaded file is missing.");
    }

    const fs = await import("fs/promises");
    const fileStream = await fs.readFile(file.filepath);

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `${Date.now()}-${file.originalFilename}`,
        Body: fileStream,
        ContentType: file.mimetype,
      };
      

    const uploadResult = await s3.upload(params).promise();


    return NextResponse.json({
      message: "File uploaded successfully",
      s3Url: uploadResult.Location,
    });
  } catch (error: any) {
    console.error("Error in upload:", error);
    return NextResponse.json(
      { error: "Failed to upload file", details: error.message },
      { status: 500 }
    );
  }
}
