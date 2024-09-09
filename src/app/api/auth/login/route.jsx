import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import * as jwt from "@/utils/jwt";
import * as passwords from "@/utils/passwords";

const prisma = new PrismaClient();

export async function POST(req, options) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Crendetials not correct" },
      { status: 401 }
    );
  }

  const isPasswordCorrect = await passwords.comparePassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    return NextResponse.json(
      { error: "Crendetials not correct" },
      { status: 401 }
    );
  }

  const token = await jwt.signJWT({ userId: user.id, email: user.email });

  return NextResponse.json({
    token,
    user,
  });
}
