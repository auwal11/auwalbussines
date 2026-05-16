import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
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

    // Get user's teams
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('team_id')
      .eq('id', user.id)
      .single()

    if (!userProfile?.team_id) {
      return NextResponse.json({ projects: [] })
    }

    // Get projects for user's team
    const { data: projects, error } = await supabase
      .from('projects')
      .select(`
        id,
        name,
        slug,
        description,
        status,
        scope,
        start_date,
        end_date,
        created_at,
        updated_at,
        created_by
      `)
      .eq('team_id', userProfile.team_id)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ projects })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
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

    const { name, slug, description, scope, startDate, endDate, budget, teamId } =
      await request.json()

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug required' },
        { status: 400 }
      )
    }

    // Verify team access
    const { data: team } = await supabase
      .from('teams')
      .select('id')
      .eq('owner_id', user.id)
      .single()

    if (!team) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 403 }
      )
    }

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        team_id: teamId || team.id,
        name,
        slug,
        description,
        scope,
        start_date: startDate,
        end_date: endDate,
        budget,
        created_by: user.id,
        status: 'active',
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
