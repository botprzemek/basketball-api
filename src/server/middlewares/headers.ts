import { NextFunction, Request, Response } from "express";

const headers: Record<string, string> = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Set-Cookie, Authorization", // TODO Cookie or Bearer?
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Origin": "*", // TODO "/localhost:d{1,6}/", Temporary wildcard for testing
    "Accept-Encoding": "gzip, deflate, identity",
    "Content-Security-Policy":
        "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
    "Content-Type": "application/json",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Origin-Agent-Cluster": "?1",
    "Referrer-Policy": "no-referrer",
    "Strict-Transport-Security": "max-age=15552000; includeSubDomains",
    "X-Content-Type-Options": "nosniff",
    "X-DNS-Prefetch-Control": "off",
    "X-Download-Options": "noopen",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Permitted-Cross-Domain-Policies": "none",
    "X-XSS-Protection": "0",
};

export default (
    _request: Request,
    response: Response,
    next: NextFunction,
): void => {
    response.removeHeader("X-Powered-By");

    Object
      .keys(headers)
      .forEach((key: keyof typeof headers) => response.setHeader(key, headers[key] as string));

    next();
};
