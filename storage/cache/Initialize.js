import NodeCache from 'node-cache'

let cache = null

const initializeCache = () => {
    cache = new NodeCache()
    return cache;
}

export default function () {
    return (cache)
        ? cache
        : initializeCache()
}