import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return apiValidationError(validated.error);
    }

    const { name, email, password, phone } = validated.data;

    const existing = await db.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return apiError("Email already in use", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: { name, email: email.toLowerCase(), password: hashedPassword, phone },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return apiSuccess(user, 201);
  } catch (error) {
    console.error("[POST /api/auth/register]", error);
    return apiError("Internal server error", 500);
  }
}
