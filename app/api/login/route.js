import { prisma } from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const {email, password} = body;
        const existingUser = await prisma.user.findUnique({where: {email}});
        if(!existingUser) return Response.json({error: "Invalid email or password"}, {status: 401});

        const isPassValid = await bcrypt.compare(password, existingUser.password);

        if(!isPassValid) return Response.json({error: "Invalid email or password"}, {status: 401});

        return Response.json({success: true}, {status:200}, {id:user.id, name:user.name, role:user.role})

    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}