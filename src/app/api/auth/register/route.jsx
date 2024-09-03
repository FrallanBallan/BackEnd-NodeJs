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
      email,
      password: hashedPassword,
      name,
    },
  });

  const token = await jwt.signJWT({ userId: user.id, email: user.email });

  return NextResponse.json({
    token,
    user,
  });
};
