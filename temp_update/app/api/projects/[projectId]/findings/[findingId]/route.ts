import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; findingId: string }> }
) {
  try {
    const { projectId, findingId } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: finding, error } = await supabase
      .from('findings')
      .select(`
        id,
        title,
        description,
        finding_type,
        severity,
        cvss_score,
        status,
        affected_endpoint,
        proof_of_concept,
        remediation,
        created_at,
        updated_at,
        finding_evidence(*)
      `)
      .eq('id', findingId)
      .eq('project_id', projectId)
      .single()

    if (error) throw error

    return NextResponse.json({ finding })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch finding' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; findingId: string }> }
) {
  try {
    const { projectId, findingId } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const updates = await request.json()

    const { data: finding, error } = await supabase
      .from('findings')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', findingId)
      .eq('project_id', projectId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(finding)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update finding' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; findingId: string }> }
) {
  try {
    const { projectId, findingId } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { error } = await supabase
      .from('findings')
      .delete()
      .eq('id', findingId)
      .eq('project_id', projectId)

    if (error) throw error

    return NextResponse.json({ message: 'Finding deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete finding' },
      { status: 500 }
    )
  }
}
