import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import nodemailer from 'nodemailer';

type Data = {
  status?: string;
  error?: string;
};

const getAccessToken = async () => {
  try {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        client_id: process.env.EMAIL_CLIENT_ID,
        client_secret: process.env.EMAIL_CLIENT_SECRET,
        refresh_token: process.env.EMAIL_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      },
    });

    console.log('Access Token:', data.access_token); // Debug log
    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to get access token:', error.response?.data || error.message);
    } else {
      console.error('Failed to get access token:', error);
    }
    throw new Error('Failed to get access token');
  }
};

const createTransporter = async () => {
  try {
    const accessToken = await getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken,
      },
    });
    return transporter;
  } catch (error) {
    console.error('Failed to create transporter:', error instanceof Error ? error.message : error);
    throw new Error('Failed to create transporter');
  }
};

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    console.log('email user:', process.env.EMAIL_USER);
    console.log('email client id:', process.env.EMAIL_CLIENT_ID);
    console.log('email client secret:', process.env.EMAIL_CLIENT_SECRET);
    console.log('email refresh token:', process.env.EMAIL_REFRESH_TOKEN);
    try {
      const { name, email, message } = req.body as { name: string; email: string; message: string };
      const transporter = await createTransporter();

      const mailOptions = {
        from: process.env.EMAIL_USER!,
        to: 'gsaintmartin@sfr.fr',
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      console.log(mailOptions);

      await transporter.sendMail(mailOptions);

      res.status(200).json({ status: 'OK' });
    } catch (error) {
      console.error('Failed to send email:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export const GET = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(405).json({ error: 'Method not allowed' });
};

export const PUT = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(405).json({ error: 'Method not allowed' });
};

export const DELETE = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(405).json({ error: 'Method not allowed' });
};
