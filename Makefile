.PHONY: debug test test-floor build

debug:
	npm run lint

test:
	npm test

test-floor:
	npm run lint
	npm test
	npm run build

build:
	npm run build
