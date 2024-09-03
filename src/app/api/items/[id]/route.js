import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
//Finding a specific ID
export const GET = async (req, { params }) => {
  //const id = params.id deconstruct
  const { id } = params;

  try {
    const item = await prisma.item.findUniqueOrThrow(
      {
        where: { id: Number(id) },
      },
      {
        status: 200,
      },
      {
        message: "This is the droid your looking for",
      }
    );
    return NextResponse.json(item);
  } catch (error) {
    console.log("Error", error);
    return NextResponse({ message: "No item was found" }, { status: 401 });
  }
};

//Updating a specific ID
  //Todo get the body when "update" is pressed and read the values
  const { id } = params;
  const { name, quantity, description, category } = await req.json();

  try {
    const updatedItem = await prisma.item.update({
      where: { id: Number(id) },

      data: {
        name,
        quantity,
        description,
        category,
      },
    });
    return NextResponse.json({ updatedItem });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "Cannot updated this item",
      },
      { status: 404 }
    );
  }
};

//Deleting a specific ID
export const DELETE = async (req, { params }) => {
  //const id = params.id
  const { id } = params;

  try {
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.log("Error", error);
    return NextResponse(
      {
        message: "Item has been destroyed to oblivion, mind the gap",
      },
      {
        status: 404,
      }
    );
  }
};
