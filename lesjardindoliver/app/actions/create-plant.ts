"use server"

import { prisma } from "@/app/lib/prisma";
import { Plant } from "@prisma/client";
import { revalidatePath } from "next/cache";



export async function createPlant(plant: Plant) {

    try {
         await prisma.plant.create({
            data: {
                title: plant.title,
                src: plant.src,
                description: plant.description,
                advice: plant.advice,
                price: plant.price,
                createdAt: new Date()
            }
        })
        revalidatePath("/plantes")
        return { success: true, message: "Plant created successfully" };
        
    } catch (error) {
        console.error("Error creating plant:", error);
        return { error: "Error creating plant" };
    }
    return 

}