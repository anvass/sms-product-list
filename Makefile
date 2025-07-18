server-start:
	cd ./server && docker-compose up --build --detach

server-stop:
	cd ./server && docker-compose down

client-start:
	cd ./client && docker-compose up --build --detach

client-stop:
	cd ./client && docker-compose down

up: client-start server-start
down: client-stop server-stop
