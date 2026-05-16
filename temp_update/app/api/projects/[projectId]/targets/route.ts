import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
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

    // Verify project access
    const { data: project } = await supabase
      .from('projects')
      .select('team_id')
      .eq('id', projectId)
      .single()

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    const { data: targets, error } = await supabase
      .from('targets')
      .select(`
        id,
        name,
        type,
        value,
        description,
        status,
        priority,
        tags,
        created_at,
        updated_at
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ targets })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch targets' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
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

    const { name, type, value, description, priority, tags } = await request.json()

    if (!name || !type || !value) {
      return NextResponse.json(
        { error: 'Name, type, and value required' },
        { status: 400 }
      )
    }

    const { data: target, error } = await supabase
      .from('targets')
      .insert({
        project_id: projectId,
        name,
        type,
        value,
        description,
        priority: priority || 'medium',
        tags: tags || [],
        status: 'active',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(target, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create target' },
      { status: 500 }
    )
  }
}
