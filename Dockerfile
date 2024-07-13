# Build a production distribution

FROM cgr.dev/chainguard/node:latest AS setup

WORKDIR /app

COPY  --chown=node:node package*.json .

RUN npm install --clean

COPY  --chown=node:node . .

RUN npm run build

# Setup production dependecies

LABEL authors="botprzemek"

FROM setup AS production

WORKDIR /app

COPY --chown=node:node package*.json .

ENV NODE_ENV=production

RUN npm install --clean --production

COPY --from=setup --chown=node:node /app/.dist ./.dist

RUN npm prune --production

# Create a clean environment

FROM cgr.dev/chainguard/wolfi-base AS runner

RUN apk update && apk add nodejs

WORKDIR /app

COPY --from=production --chown=node:node /app .

ENV NODE_ENV=production

ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=3000
ENV SERVER_VERSION=1

CMD [ "node", ".dist/index.js" ]

EXPOSE 3000