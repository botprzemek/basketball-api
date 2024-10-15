// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
//
// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });
//
//     const token: string | undefined = authHeader.split(" ")[1];
//
//     if (!token) {
//         return res.status(403).json({ message: "Invalid token" });
//     }
//
//     jwt.verify(token, SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: "Invalid token" });
//         }
//
//         req.user = user;
//         next();
//     });
// };
//
// const checkPermission = (action: string) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const userPermissions = permissions.find(p => p.userId === req.user.id && p.tenantId === req.tenantId);
//         if (!userPermissions || !userPermissions[action]) {
//             return res.status(403).json({ message: "Insufficient permissions" });
//         }
//         next();
//     };
// };