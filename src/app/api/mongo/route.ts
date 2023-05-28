import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

//To check if GET Method has ID parameter
async function fetchProduct(prisma: PrismaClient, id: string | null) {
    return id
        ? prisma.product.findFirst({ where: { id } })
        : prisma.product.findMany({
              include: {
                  brand: true,
              },
          })
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    await prisma.$connect()
    try {
        const Products = await fetchProduct(prisma, id)
        return NextResponse.json(Products)
    } finally {
        await prisma.$disconnect()
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { name, description, price } = body
    try {
        await prisma.$connect()
        const createProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
            },
        })
        return NextResponse.json(createProduct)
    } finally {
        await prisma.$disconnect()
    }
}

export async function PUT(req: NextRequest) {
    const body = await req.json()
    const { id, name, description, price } = body
    try {
        await prisma.$connect()
        const updateProduct = await prisma.product.update({
            where: {
                id,
            },
            data: {
                name,
                description,
                price,
            },
        })
        return NextResponse.json(updateProduct)
    } finally {
        await prisma.$disconnect()
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id") as string
    // return NextResponse.json({ id })
    try {
        await prisma.$connect()
        const deleteProduct = await prisma.product.delete({
            where: {
                id,
            },
        })
        return NextResponse.json(deleteProduct)
    } finally {
        await prisma.$disconnect()
    }
}
