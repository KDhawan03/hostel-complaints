import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
export async function POST(req) {
    try {
        const body = await req.json();
        //todo implement jwt
        const userId = req.headers.get("userId");
        //todo add image also
        const {title, description, category} = body;
        if(!userId) {
            return Response.json({error: "unauthorized"}, {status:401})
        }
        if(!title || !description || !category) {
            return Response.json({error:"Missing required fields"}, {status:400})
        }
        const complaint = await prisma.complaint.create({
            data: {
                title, description, category, status: "PENDING", userId: userId
            }
        })
        return Response.json(complaint, { status: 201 });
    } catch (error) {
        console.error("Complaint Creation Error:", error);
        return Response.json({error:"Internal server error"}, {status:500})
    }
}