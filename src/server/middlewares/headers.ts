const headers = {
    "Accept": "application/graphql-response+json;charset=utf-8, application/json;charset=utf-8",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Origin": "*",
    "Accept-Encoding": "gzip, deflate, identity",
    "Content-Security-Policy":
        "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
    "Content-Type": "application/graphql-response+json",
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
} satisfies Record<string, string>;

export default (
    response: Response,
): void => {
    Object
      .entries(headers)
      .forEach(([key, value]) => response.headers.append(key, value));
};
