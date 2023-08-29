import supabase from './supabase/Initialize'
import prisma from './prisma/Initialize'
import supabaseQuery from './supabase/Statement'
import prismaQuery from './prisma/Statement'

const active = process.env.SUPABASE_ACTIVE === 'true'

if (active) supabase()
else prisma()

export default function () {
    return active
        ? supabaseQuery
        : prismaQuery
}