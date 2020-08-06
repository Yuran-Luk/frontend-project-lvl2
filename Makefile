install:
	npm install

publish:
	npm publish --dry-run

push:
	git push -u origin master

test:
		npm test

test-coverage:
		npm test -- --coverage

lint:
	npx eslint .

.PHONY: test
