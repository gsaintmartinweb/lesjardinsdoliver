import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "../../components/email";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {

    const request = await req.json(); // Parse the request body as JSON

    console.log("Request body:", request);
   

    // Destructure and validate the required fields
    const { name, email, message } = request as {
      name: string;
      email: string;
      message: string;
    };

    if (!name || !email || !message) {
      throw new Error("Invalid request body"); // Handle invalid request body
    }

    await resend.emails.send({
      from: "gsaintmartin66@gmail.com",
      to: "gsaintmartin66@gmail.com",
      subject: "New Contact Form Submission",
      text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: EmailTemplate({ name, email, message }),
    });

    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Optional: Export other methods if needed
export async function GET(req: NextRequest) {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
