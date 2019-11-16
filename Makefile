install:
	npm install
start:
	npx babel-node src/bin/brain-games.js
publish:
	npm publish --dry-run
push:
	git push -u origin master
lint:
	npx eslint .
