import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  try {
    const plants = await prisma.plant.findMany();
    return NextResponse.json(plants, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching plants:', error);
    return NextResponse.json({ error: 'Error fetching plants', details: error.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { title, src, description, advice, price } = body;
  try {
    const newPlant = await prisma.plant.create({
      data: { 
        title, 
        src, 
        description, 
        advice, 
        price, 
        createdAt: new Date() 
      },
    });
    return NextResponse.json(newPlant, { status: 201 });
  } catch (error: any) {
    console.error('Error creating plant:', error);
    return NextResponse.json({ error: 'Error creating plant', details: error.message }, { status: 500 });
  }
};