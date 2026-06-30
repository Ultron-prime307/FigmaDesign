import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const automations = await prisma.automation.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(automations)
  } catch (error) {
    console.error("Error fetching automations:", error)
    return NextResponse.json(
      { error: "Failed to fetch automations" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, config } = body

    if (!name || !config) {
      return NextResponse.json(
        { error: "Name and config are required" },
        { status: 400 }
      )
    }

    const automation = await prisma.automation.create({
      data: {
        name,
        description: description || null,
        config: JSON.stringify(config),
        userId: session.user.id,
      },
    })

    return NextResponse.json(automation, { status: 201 })
  } catch (error) {
    console.error("Error creating automation:", error)
    return NextResponse.json(
      { error: "Failed to create automation" },
      { status: 500 }
    )
  }
}
