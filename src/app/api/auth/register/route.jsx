import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import * as jwt from "@/utils/jwt";

import * as passwords from "@/utils/passwords";

const prisma = new PrismaClient();

export const POST = async (req, options) => {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  //TODO hash password
  const hashedPassword = await passwords.hashPassword(password);
  console.log(hashedPassword);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  //This might need to be implemented in post. cant post with middleware
  const token = await jwt.signJWT({ userId: user.id, email: user.email });
  // const token = await jwt.signJWT({user: user.id})
  console.log(user);
  return NextResponse.json({
    token,
    user,
  });
};
