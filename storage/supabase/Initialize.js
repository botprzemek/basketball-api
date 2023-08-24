import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_KEY
let supabase = null

const initializeSupabase = () => {
    supabase = createClient(url, key, { auth: { persistSession: false } })
    return supabase;
}

export default function () {
    console.log('[storage] reconnected supabase client')
    return (supabase)
        ? supabase
        : initializeSupabase()
}
