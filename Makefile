run:
	cd server && npm install --save-dev sequelize-cli
	cd server/db && sequelize db:create
	cd server/db && sequelize db:migrate
	cd client && npm install
	npm run dev
