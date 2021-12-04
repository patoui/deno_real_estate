# Deno Test
Trying out [Deno](https://deno.land/)

## Requirements

- Docker must be installed, instructions can be found [here](https://docs.docker.com/engine/install/)

## Running the Application

Simple run

```
docker-compose up
```

You should see the following message:

```
HTTP webserver running. Access it at: http://localhost/
```

And should be able to visit the above linked URL to see the app in action

### Accessing the database

```
docker-compose -f docker-compose.yml exec database psql -U deno_test -d deno_test_db
```