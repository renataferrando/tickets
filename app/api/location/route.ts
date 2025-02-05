/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async function GET(req: any) {


  const { searchParams } = new URL(req.url);

  const name = searchParams.get("namePrefix");
  console.log("nam,eee", name)
  try {
    const response = await axios.get(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${name}`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, // Use environment variable
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );

    return NextResponse.json(response.data); // Return the external API response
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};
