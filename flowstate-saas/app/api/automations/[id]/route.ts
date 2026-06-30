import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const automation = await prisma.automation.findUnique({
      where: { id: params.id },
    })

    if (!automation || automation.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(automation)
  } catch (error) {
    console.error("Error fetching automation:", error)
    return NextResponse.json(
      { error: "Failed to fetch automation" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const automation = await prisma.automation.findUnique({
      where: { id: params.id },
    })

    if (!automation || automation.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const body = await req.json()
    const { name, description, enabled, config } = body

    const updated = await prisma.automation.update({
      where: { id: params.id },
      data: {
        name: name ?? automation.name,
        description: description ?? automation.description,
        enabled: enabled ?? automation.enabled,
        config: config ? JSON.stringify(config) : automation.config,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating automation:", error)
    return NextResponse.json(
      { error: "Failed to update automation" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const automation = await prisma.automation.findUnique({
      where: { id: params.id },
    })

    if (!automation || automation.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    await prisma.automation.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting automation:", error)
    return NextResponse.json(
      { error: "Failed to delete automation" },
      { status: 500 }
    )
  }
}
