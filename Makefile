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
	    @echo "database        - Access database (psql) CLI                      - ex: make database-cli"
	    @echo ""
	    @echo "DATABASE"
	    @echo ""
	    @echo "migrate         - Run up migrations                               - ex: make migrate-up"
	    @echo "migrate-create  - Creates up and down migration files             - ex: migrate-create name=migration_name_here"
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
	echo '' > app/database/migrations/`date +%Y_%m_%d_%H%M%S`_$(name).sql

migrate:
	docker exec -it deno_test_app /bin/bash -c "deno run --allow-read --allow-net app/database/migrate.ts"
