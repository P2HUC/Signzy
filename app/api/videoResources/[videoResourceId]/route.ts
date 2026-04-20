import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import db from "@/db/drizzle";
import { videoResources } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { videoResourceId: number } }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.videoResources.findFirst({
    where: eq(videoResources.id, params.videoResourceId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { videoResourceId: number } }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = (await req.json()) as typeof videoResources.$inferSelect;
  const data = await db
    .update(videoResources)
    .set({
      ...body,
    })
    .where(eq(videoResources.id, params.videoResourceId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { videoResourceId: number } }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db
    .delete(videoResources)
    .where(eq(videoResources.id, params.videoResourceId))
    .returning();

  return NextResponse.json(data[0]);
};
