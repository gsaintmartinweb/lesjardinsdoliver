// app/pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        console.log('Received contact form submission:', { name, email, message });
        // Logic to handle the form data (e.g., send email, save to database)
        res.status(200).json({ status: 'OK' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
