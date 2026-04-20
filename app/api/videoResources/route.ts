import { type NextRequest, NextResponse } from "next/server";

import db from "@/db/drizzle";
import { videoResources } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (req: NextRequest) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.videoResources.findMany();
  let filteredData = data;

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter");
  if (filter) {
    try {
      const parsedFilter = JSON.parse(filter);
      if (parsedFilter.id && Array.isArray(parsedFilter.id)) {
        filteredData = filteredData.filter((d) => parsedFilter.id.includes(d.id));
      }
    } catch {}
  }

  let responseData = filteredData;
  const range = searchParams.get("range");
  if (range) {
    try {
      const parsedRange = JSON.parse(range);
      responseData = filteredData.slice(parsedRange[0], parsedRange[1] + 1);
    } catch {}
  }

  return new NextResponse(JSON.stringify(responseData), {
    headers: {
      "Content-Range": `videoResources 0-${responseData.length}/${filteredData.length}`,
    },
  });
};

export const POST = async (req: NextRequest) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = (await req.json()) as typeof videoResources.$inferSelect;

  const data = await db
    .insert(videoResources)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
