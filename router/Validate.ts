export default function (req, res, next) {
    if (req.headers['secret'] !== process.env.SECRET) {
        console.log(`${new Date().toLocaleTimeString('pl-PL')} [server] unauthorized acccess (${req.ip})`)
        return res.sendStatus(401)
    }
    res.locals.start = performance.now()
    next()
}