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

    const { searchParams } = new URL(request.url)
    const severity = searchParams.get('severity')
    const status = searchParams.get('status')

    let query = supabase
      .from('findings')
      .select(`
        id,
        title,
        description,
        finding_type,
        severity,
        cvss_score,
        cve_id,
        affected_endpoint,
        status,
        discovered_by,
        assigned_to,
        created_at,
        updated_at,
        targets(id, name)
      `)
      .eq('project_id', projectId)

    if (severity) {
      query = query.eq('severity', severity)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data: findings, error } = await query.order('created_at', {
      ascending: false,
    })

    if (error) throw error

    // Calculate summary statistics
    const summary = {
      total: findings?.length || 0,
      critical: findings?.filter((f) => f.severity === 'critical').length || 0,
      high: findings?.filter((f) => f.severity === 'high').length || 0,
      medium: findings?.filter((f) => f.severity === 'medium').length || 0,
      low: findings?.filter((f) => f.severity === 'low').length || 0,
      info: findings?.filter((f) => f.severity === 'info').length || 0,
    }

    return NextResponse.json({ findings, summary })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch findings' },
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

    const {
      title,
      description,
      finding_type,
      severity,
      cvss_score,
      cve_id,
      affected_endpoint,
      affected_parameter,
      proof_of_concept,
      remediation,
      target_id,
      tags,
    } = await request.json()

    if (!title || !description || !finding_type || !severity) {
      return NextResponse.json(
        { error: 'Title, description, type, and severity required' },
        { status: 400 }
      )
    }

    const { data: finding, error } = await supabase
      .from('findings')
      .insert({
        project_id: projectId,
        target_id,
        title,
        description,
        finding_type,
        severity,
        cvss_score,
        cve_id,
        affected_endpoint,
        affected_parameter,
        proof_of_concept,
        remediation,
        tags: tags || [],
        discovered_by: user.id,
        status: 'open',
      })
      .select()
      .single()

    if (error) throw error

    // Log activity
    await supabase.from('activity_timeline').insert({
      project_id: projectId,
      user_id: user.id,
      action_type: 'finding_created',
      resource_type: 'finding',
      resource_id: finding.id,
      details: { severity, title },
    })

    return NextResponse.json(finding, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create finding' },
      { status: 500 }
    )
  }
}
