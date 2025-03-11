// filepath: /Users/gsaintmartin/WORK/lesjardinsdoliver/lesjardindoliver/app/api/plantes/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Get a single plant by ID
    try {
      const plant = await prisma.plant.findUnique({
        where: { id: Number(id) },
      });
      if (plant) {
        res.status(200).json(plant);
      } else {
        res.status(404).json({ error: 'Plant not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching plant' });
    }
  } else if (req.method === 'PUT') {
    // Update a plant by ID
    const { title, src, description, advice, price } = req.body;
    try {
      const updatedPlant = await prisma.plant.update({
        where: { id: Number(id) },
        data: { title, src, description, advice, price },
      });
      res.status(200).json(updatedPlant);
    } catch (error) {
      res.status(500).json({ error: 'Error updating plant' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a plant by ID
    try {
      await prisma.plant.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting plant' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}