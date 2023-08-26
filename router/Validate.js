export default function (req, res, next) {
    if (req.headers['secret'] !== process.env.SECRET) return res.sendStatus(401)
    res.locals.start = performance.now()
    next()
}