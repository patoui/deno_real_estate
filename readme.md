# Deno Test
Trying out [Deno](https://deno.land/)

## Requirements

- [Docker](https://docs.docker.com/engine/install/)
- [Make](https://www.tutorialspoint.com/unix_commands/make.htm) is installed (usually via `apt install build-essential`)

## Running the Application

Simple run

```
make start
```

when it finishes running, you should be able to access the application at http://0.0.0.0:8080

### Accessing the database

```
make database
```

### Running database migrations

```
make migrate
```

### Compiling and running to executable

Run the following command to compile to an executable

```
make compile
```

once completed you'll should see `main` file which is the generated executable
