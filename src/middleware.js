import { NextResponse } from "next/server";
import * as jwt from "@/utils/jwt";

const protectedPaths = [
  [/\/api\/items\/.+/, ["PUT", "DELETE", "GET"]],
  [/\/api\/items/, ["POST"]],
  [/\/api\/todos\/.+/, ["PUT", "DELETE", "GET"]],
  [/\/api\/todos/, ["POST"]],
  [/\/api\/todos\/.+\/items\/.+/, ["PUT", "DELETE", "GET"]],
  [/\/api\/todos\/.+\/items/, ["POST"]],
];

export const middleware = async (req) => {
  const isProtected = protectedPaths.some(([path, methods]) => {
    const regex = new RegExp(path);
    if (regex.test(req.nextUrl.pathname)) {
      if (methods.includes(req.method)) {
        return true;
      }
    }
    return false;
  });
  if (isProtected) {
    try {
      const bearer = req.headers.get("Authorization");
      console.log("Bearer", bearer);
      const token = bearer.split(" ")[1];
      console.log("Token", token);
      const payload = await jwt.verifyJWT(token, process.env.JWT_SECRET);
      console.log("Payload", payload);
      req.userId = payload.userId;
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  return NextResponse.next();
};
