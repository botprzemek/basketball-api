import supabase from './Initialize.js'
import cache from '../cache/Initialize.js'
import storage from '../Storage.js'
import {queryPlayers} from "./Statement.js";

export default function (identifier) {
    console.log(`[channel] subscribed to changes on ${identifier}`)
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
                // const data = await storage()[`${identifier}By`](identifier, '*', 'id', payload.new.id, 'id')
                const data = await queryPlayers()
                cache().set(identifier, data, 3600000)
                console.log(cache().get(identifier).data)
                console.log(`[storage] inserted row in ${identifier} (${payload.new.name} ${payload.new.lastname})`)
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
                console.log(payload)
                console.log(data)
                // cache().set(tables.at(0), data, cacheTime)
                // console.log(`[storage] refreshed table ${identifier} - new (${payload.new.name} ${payload.new.lastname})`)
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
                console.log(`[storage] removed row in ${identifier} (${match.name} ${match.lastname})`)
            })
        .subscribe()
}