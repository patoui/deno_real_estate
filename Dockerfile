FROM denoland/deno:1.18.0

WORKDIR /app

COPY . .

CMD ["run", "--allow-net", "--allow-read", "--watch", "main.ts"]