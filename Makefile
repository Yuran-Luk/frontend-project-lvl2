publish:
	npm publish --dry-run

test:
	npm test

json:
	gendiff __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

node:
	nvm use 15.5.0

.PHONY: test