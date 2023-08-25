export default function (req, res, next) {
    if (
        req.headers['secret'] !== process.env.SECRET ||
        req.headers['content-type'] !== 'application/json'
    ) return res.sendStatus(401)

    res.locals.start = performance.now()
    next()
}