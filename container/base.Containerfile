FROM oven/bun:alpine

ENV NEXT_TELEMETRY_DISABLED=1

# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile#L5
RUN apk add --no-cache libc6-compat;
