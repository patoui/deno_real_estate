FROM denoland/deno:1.34.1

WORKDIR /app

COPY . .

CMD ["run", "--allow-net", "--allow-read", "--allow-env", "--watch", "main.ts"]