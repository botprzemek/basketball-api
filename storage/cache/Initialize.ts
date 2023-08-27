import * as nodeCache from 'node-cache'

let cache = null

const initializeCache = () => {
    cache = new nodeCache()
    return cache
}

export default function () {
    return (cache)
        ? cache
        : initializeCache()
}