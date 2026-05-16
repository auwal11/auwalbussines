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

    const { data: scans, error } = await supabase
      .from('scans')
      .select(`
        id,
        scan_type,
        tool_name,
        status,
        progress,
        findings_count,
        started_at,
        completed_at,
        executed_by,
        created_at,
        targets(id, name)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ scans })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch scans' },
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

    const { scan_type, tool_name, target_id, parameters } = await request.json()

    if (!scan_type || !tool_name) {
      return NextResponse.json(
        { error: 'scan_type and tool_name required' },
        { status: 400 }
      )
    }

    // Create scan record
    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .insert({
        project_id: projectId,
        target_id,
        scan_type,
        tool_name,
        status: 'pending',
        progress: 0,
        parameters: parameters || {},
        executed_by: user.id,
      })
      .select()
      .single()

    if (scanError) throw scanError

    // Log activity
    await supabase.from('activity_timeline').insert({
      project_id: projectId,
      user_id: user.id,
      action_type: 'scan_started',
      resource_type: 'scan',
      resource_id: scan.id,
      details: { tool_name, scan_type },
    })

    // Queue the scan job (in production, this would use a job queue like Bull or Vercel Functions)
    // For now, we'll update status to running immediately
    await supabase
      .from('scans')
      .update({
        status: 'running',
        started_at: new Date().toISOString(),
      })
      .eq('id', scan.id)

    return NextResponse.json(scan, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create scan' },
      { status: 500 }
    )
  }
}
