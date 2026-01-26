import {prisma} from '@/lib/prisma'
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

const generateOTP = async(userId, type) => {
    await prisma.oTP.deleteMany({where:{userId, type}});

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    //5 minute otp duration
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  return await prisma.oTP.create({
    data: {
      code,
      type,
      expiresAt,
      userId
    }
  })
}

export default generateOTP