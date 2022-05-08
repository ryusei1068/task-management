run:
	cd server && npm install --save-dev sequelize-cli
	cd server/db && sequelize db:create
	cd server/db && sequelize db:migrate
	npm run dev
