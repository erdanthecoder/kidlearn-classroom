import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Simple middleware to require an authenticated Supabase JWT in the Authorization header
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ error: 'Missing Authorization header' })

    const parts = auth.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid Authorization header format' })

    const token = parts[1]

    // Optionally, verify token signature if you have the JWT secret or JWKS
    // Here we do a lightweight check with Supabase to fetch the user
    const { data: user, error } = await supabase.auth.getUser(token as any)
    if (error || !user?.user) return res.status(401).json({ error: 'Invalid token' })

    // Attach user to request object for downstream handlers
    ;(req as any).supabaseUser = user.user
    return next()
  } catch (err) {
    console.error('auth middleware error', err)
    return res.status(500).json({ error: 'Auth middleware error' })
  }
}

// Helper to create a service role Supabase client for server-side operations
export function createServiceSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY must be set')
  }
  return createClient(SUPABASE_URL, SUPABASE_KEY)
}
