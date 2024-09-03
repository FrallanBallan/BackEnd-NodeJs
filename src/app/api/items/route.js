import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

//Get all items, filter by name and quantity
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  let items = [];

  const search = searchParams.get("search");

  //TODO Add radio buttons for category choice and chosen value goes into url dynamicly
  //TODO Add posiblity for muliple search

  if (search) {
    //TRY
    try {
      items = await prisma.item.findMany({
        category: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      });

      console.log(items);
      return NextResponse.json(items, { status: 200 });
      //CATCH
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "invalid JSON",
        },
        {
          status: 404,
        }
      );
    }
  } else {
    items = await prisma.item.findMany();
    console.log(items);
    return NextResponse.json(items, { status: 200 });
  }
};

//Post an ITEM to the ITEM LIST DB
export const POST = async (req) => {
  let body;

  try {
    //Getting the specs for the new item added
    body = await req.json();
    console.log("body", body);
  } catch (error) {
    return NextResponse(
      {
        message: "Invalid JSON",
      },
      {
        status: 400,
      }
    );
  }
  //TODO VALIDERINGS FUNCTION
  //________________________

  //   TRY TO POST THE NEW ITEM TO PRISMA AND DB

  try {
    const newItem = await prisma.item.create({
      data: {
        name: body.name,
        quantity: Number(body.quantity),
        inStock: body.inStock,
        category: body.category,
        description: body.description,
      },
    });
    console.log(newItem);
    return NextResponse.json({ newItem });
  } catch (error) {
    return NextResponse(
      {
        message: "Invalid JSON",
      },
      {
        status: 400,
      }
    );
  }
};

//Updating an ITEM
export const PUT = async (req) => {};
