install:
	npm install

publish:
	npm publish --dry-run

push:
	git push -u origin master

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

.PHONY: test
