import { type NextRequest, NextResponse } from "next/server";
import { TEMPLATE_STYLE } from "@/registry";

export const dynamic = "force-static";

export const GET = async (_: NextRequest) => {
  return NextResponse.json({
    name: "index",
    ...TEMPLATE_STYLE,
  });
};
