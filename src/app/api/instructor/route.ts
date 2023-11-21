import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Instructor } from "@prisma/client";
import authorized from "../authorized";
const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  const auth = await authorized(request);
  if (auth.status !== 200) {
    return NextResponse.json(auth, { status: auth.status });
  }
  const classes = await prisma.instructor.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return NextResponse.json(classes);
};

export const POST = async (request: Request) => {
  try {
    const auth = await authorized(request);
    if (auth.status !== 200) {
      return NextResponse.json(auth, { status: auth.status });
    }
    const body: Instructor = await request.json();
    const newInstructor = await prisma.instructor.create({
      data: {
        name: body.name,
        nik: body.nik,
        address: body.address,
        phone: body.phone,
      },
    });

    return NextResponse.json(
      { message: "Data Created Successfuly", data: newInstructor },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Data Created Failed", data: error },
      { status: 400 }
    );
  }
};