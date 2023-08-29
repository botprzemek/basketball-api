import supabase from './Initialize'
import cache from '../cache/Initialize'
import {storage} from '../Storage'

export default function (identifier: string) {
    console.log(`[channel] listening to changes on ${identifier} table`)
    supabase()
        .channel(`${identifier}-insert`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: identifier
            },
            async (payload) => {
                if (payload.errors) return
                const insertion = (await storage()[`${identifier}By`]('id', payload.new.id)).data[0]
                const data = cache().get(identifier)
                data.data.push(insertion)
                data.data.sort((first, second) => {
                    if (first.id < second.id) return -1
                    if (first.id > second.id) return 1
                    return 0
                })
                cache().set(identifier, data, 3600000)
                console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] inserted row in ${identifier} (${payload.new.name} ${payload.new.lastname})`)
            })
        .subscribe()
    supabase()
        .channel(`${identifier}-update`)
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: identifier
            },
            async (payload) => {
                if (payload.errors) return
                const data = cache().get(identifier)
                data.data.push(payload.new)
                data.data.sort((first, second) => {
                    if (first.id < second.id) return -1
                    if (first.id > second.id) return 1
                    return 0
                })
                cache().set(identifier, data, 3600000)
                console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] updated row with id ${payload.new.id} (${payload.new.name} ${payload.new.lastname})`)
            })
        .subscribe()
    supabase()
        .channel(`${identifier}-remove`)
        .on(
            'postgres_changes',
            {
                event: 'DELETE',
                schema: 'public',
                table: identifier
            },
            async (payload) => {
                if (payload.errors) return
                const data = cache().get(identifier)
                const match = data.data.filter(row => { return payload.old.id === row.id }).at(0)
                const mismatch = data.data.filter(row => { return payload.old.id !== row.id })
                cache().set(identifier, mismatch, 3600000)
                console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] removed row in ${identifier} (${match.name} ${match.lastname})`)
            })
        .subscribe()
}