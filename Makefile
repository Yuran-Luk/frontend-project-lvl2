install:
	npm install

publish:
	npm publish --dry-run

push:
	git push -u origin master

lint:
	npx eslint .

.PHONY: test
