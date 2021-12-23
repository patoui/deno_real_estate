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

You should see the following message:

```
HTTP webserver running. Access it at: http://localhost/
```

And should be able to visit the above linked URL to see the app in action

### Accessing the database

```
make database
```

### Running database migrations

```
make migrate
```

### Compiling to executable

```
make compile
```
