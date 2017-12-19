.PHONY: default
default:
	docker-compose up -d --build
	docker-compose logs -f --tail 10 web

.PHONY: logs
logs:
	docker-compose logs -f --tail 30

.PHONY: down
down:
	docker-compose down

.PHONY: tmpdb-mysqlcli
tmpdb-mysqlcli:
	@docker exec -it sqlbattle_tmpdb_1 sh -c 'mysql -p$$MYSQL_ROOT_PASSWORD'

.PHONY: tmpdb-restart
tmpdb-restart:
	@docker-compose restart tmpdb
