publish:
	npm publish --dry-run

test:
	npm test

jsonDiff:
	gendiff __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

ymlDiff:
	gendiff __tests__/__fixtures__/before.yml __tests__/__fixtures__/after.yml

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

node:
	nvm use 15.5.0

.PHONY: test