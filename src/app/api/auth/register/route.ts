import { NextResponse } from "next/server";
import { register } from "@/lib/auth";
import { z } from "zod";

export const runtime = "nodejs";

// Validation schema
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = userSchema.parse(body);
    
    const user = await register(validatedData);

    return NextResponse.json(
      {
        user,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error creating user" },
      { status: 400 }
    );
  }
} 