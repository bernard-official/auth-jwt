import { COOKIE_NAME } from "@/constants";
import axios from "axios";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// protecting route
// we have to update and verify the JWT

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  //   check for secret
  const secret = process.env.JWT_SECRET || "";

  try {
    verify(value, secret);

    const response = {
      user: "Authorised User",
    };
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}
