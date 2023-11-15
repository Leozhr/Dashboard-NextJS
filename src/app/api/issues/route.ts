import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/providers/prisma'

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = createIssueSchema.safeParse(body)

  if (!validation.success) {
    return new Response(JSON.stringify({ error: validation.error }), {
      status: 400,
    })
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  })

  return NextResponse.json(newIssue, { status: 201 })
}