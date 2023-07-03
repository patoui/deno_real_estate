help:
	    @echo ""
	    @echo "Makefile commands:"
	    @echo ""
	    @echo "DOCKER"
	    @echo ""
	    @echo "start           - Start the docker containers                     - ex: make start"
	    @echo "stop            - Stop the docker containers                      - ex: make stop"
	    @echo ""
	    @echo "CLIs"
	    @echo ""
	    @echo "server          - Access go container                             - ex: make server"
	    @echo "database        - Access database (psql) CLI                      - ex: make database"
	    @echo "redis           - Access redis (redis-cli) CLI                    - ex: make redis"
	    @echo ""
	    @echo "DATABASE"
	    @echo ""
	    @echo "migrate         - Run up migrations                               - ex: make migrate-up"
	    @echo "migrate-create  - Creates up and down migration files             - ex: migrate-create name=migration_name_here"
	    @echo ""
	    @echo "COMPILE"
	    @echo ""
	    @echo "compile         - Compile the application                         - ex: make compile"
	    @echo ""
	    @echo "TEST"
	    @echo ""
	    @echo "test            - Run all tests                                  - ex: make test"
	    @echo ""

start:
	docker-compose -f docker-compose.yml up -d

stop:
	docker-compose -f docker-compose.yml down

server:
	docker exec -it deno_test_app /bin/bash

database:
	docker-compose -f docker-compose.yml exec database psql -U deno_test -d deno_test_db

migrate-create:
	echo '' > application/database/migrations/`date +%Y_%m_%d_%H%M%S`_$(name).sql

migrate:
	docker exec -it deno_test_app /bin/bash -c "deno run --allow-read --allow-net --allow-env application/database/migrate.ts"

redis:
	docker exec -it deno_test_redis redis-cli

compile:
	docker exec -it deno_test_app /bin/bash -c "deno compile --allow-net --allow-read -o main main.ts"

test:
	docker exec -it deno_test_app /bin/bash -c "deno test --allow-read --allow-net --allow-env"

tail:
	$(eval ID := $(shell docker ps --filter "name=deno_test_app" -q))
	docker logs -f ${ID}
