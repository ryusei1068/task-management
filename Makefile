run:
	cd taskmanagement/server
	npm install --save-dev sequelize-cli
	cd db
	sequelize db:create
	sequelize db:migrate
	cd ..
	cd ..
	npm run dev
