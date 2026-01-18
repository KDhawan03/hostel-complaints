import {prisma} from '@/lib/prisma'
import bcrypt from 'bcrypt';
export async function POST(req) {
  try {
    const body = await req.json();
    const {name, email, password} = body;

    if (!name || !email || !password) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({where:{email}});
    if(existingUser) {
        return Response.json({error: "user already exists"}, {status: 409})
    }
    const hashedPass = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPass,
        },
      });
    
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return Response.json({error: "Internal server error"}, {status: 500})
  }
}