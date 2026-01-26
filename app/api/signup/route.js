import generateOTP from '@/lib/otp';
import {prisma} from '@/lib/prisma'
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
export async function POST(req) {
  try {
    const body = await req.json();
    const {name, email, password} = body;

    if (!name || !email || !password) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    if (/\s/.test(password)) {
      return Response.json(
        { error: "Password cannot contain spaces" },
        { status: 400 }
      );
    }

    if(!email.endsWith("@nitjsr.ac.in")) {
      return Response.json({error:"only NITJSR emails allowed"}, {status:400});
    }

    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
        return Response.json({ error: "Password too weak" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({where:{email}});
    if(existingUser) {
      if(existingUser.isVerified === true) {
        return Response.json({error: "Email already registered"}, {status: 409})
      }
      const newOTP = await generateOTP(existingUser.id, "SIGNUP");
      //send otp via nodemailer
      console.log("otp for", email, "is", newOTP.code);
      return Response.json({message: "otp sent to your mail"}, {status:200});
    }
    const hashedPass = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass
      },
    });
    const newUserOTP = await generateOTP(newUser.id, "SIGNUP");
    console.log("OTP for NEW user", email, "is", newUserOTP.code);
    const id = newUser.id
    return Response.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return Response.json({error: "Internal server error"}, {status: 500})
  }
}