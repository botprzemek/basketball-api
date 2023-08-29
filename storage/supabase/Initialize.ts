import {createClient} from '@supabase/supabase-js'
import listener from './Listener'

let supabase = null

const initializeSupabase = () => {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, { auth: { persistSession: false } })
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] connected to supabase database`)
    listener('players')
    return supabase;
}

export default function () {
    return supabase
        ? supabase
        : initializeSupabase()
}
