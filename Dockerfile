FROM denoland/deno:1.16.4

WORKDIR /app

COPY . .

CMD ["run", "--allow-net", "main.ts"]