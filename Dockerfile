FROM denoland/deno:1.19.2

WORKDIR /app

COPY . .

CMD ["run", "--allow-net", "--allow-read", "--watch", "main.ts"]