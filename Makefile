PROJECT_NAME ?= guessword
IMAGE_NEXTJS := $(PROJECT_NAME)_nextjs
IMAGE_MIGRATE := $(PROJECT_NAME)_migrate
CONTAINER_NEXTJS := $(PROJECT_NAME)_nextjs
CONTAINER_MIGRATE := $(PROJECT_NAME)_migrate
WEBSITE_URL_WITHOUT_HTTP ?= example.com
ADMIN_EMAIL ?= admin@example.com


.PHONY: build migrate up down clean dev-up dev-down dev-logs dev-status

build:
	docker build -t $(IMAGE_NEXTJS) -f Dockerfile .
	docker build --target build -t $(IMAGE_MIGRATE) -f Dockerfile .

migrate:
	docker run \
		--name $(CONTAINER_MIGRATE) \
		-v "$(PWD)/nextjs/data:/nextjs/data:rw" \
		-v "$(PWD)/.app.env:/nextjs/.env:ro" \
		$(IMAGE_MIGRATE) \
		npx tsx lib/db/migrations/initializeUsers.ts

down:
	docker rm -f $(CONTAINER_NEXTJS) 2>/dev/null || true

up: build down migrate
	docker run -d \
		--name $(CONTAINER_NEXTJS) \
		--restart always \
		-v "$(PWD)/nextjs/data:/nextjs/data:rw" \
		-v "$(PWD)/.app.env:/nextjs/.env:ro" \
		--cpus="0.3" \
		--memory="250m" \
		### NETWORK CONFIGURATION ###
		#   Configure to your production environment
		--network nginx-proxy \
		-e VIRTUAL_HOST="$(WEBSITE_URL_WITHOUT_HTTP)" \
		-e LETSENCRYPT_HOST="$(WEBSITE_URL_WITHOUT_HTTP)" \
		-e LETSENCRYPT_EMAIL="$(ADMIN_EMAIL)" \
		-e VIRTUAL_PORT=80 \
		### END NETWORK CONFIGURATION ###
		$(IMAGE_NEXTJS)

dev-up: build down migrate
	docker run -d \
		--name $(CONTAINER_NEXTJS) \
		-v "$(PWD)/nextjs/data:/nextjs/data:rw" \
		-v "$(PWD)/.app.env:/nextjs/.env:ro" \
		--cpus="0.3" \
		--memory="250m" \
		-p 3000:80 \
		$(IMAGE_NEXTJS)

clean: down
	docker rmi $(IMAGE_NEXTJS) $(IMAGE_MIGRATE) || true

logs:
	docker logs $(CONTAINER_NEXTJS)

status:
	docker ps -a | grep $(CONTAINER_NEXTJS)
	docker inspect $(CONTAINER_NEXTJS) --format '{{.State.Status}}'
	docker inspect $(CONTAINER_NEXTJS) --format '{{.State.ExitCode}}'