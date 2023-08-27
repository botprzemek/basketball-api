import * as dotenv from 'dotenv'
import {createClient} from '@supabase/supabase-js'
import listener from './Listener'

dotenv.config()

let supabase = null

const initializeSupabase = () => {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, { auth: { persistSession: false } })
    listener('players')
    return supabase;
}

export default function () {
    return supabase
        ? supabase
        : initializeSupabase()
}
