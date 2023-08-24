import jwt from 'jsonwebtoken'

export default function createJWT(name) {
    return jwt.sign({ name: name }, process.env.SECRET, { expiresIn: 60 * 60 });
}