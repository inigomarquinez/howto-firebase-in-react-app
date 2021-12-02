ensure-dependencies:
	@echo "Ensuring docker is installed..."
	@docker info

brand:
	@echo "Creating our server manifest file..."
	@node_modules/make-manifest/bin/make-manifest
	@cat ./manifest.json

package:
	@echo "Building our server docker image..."
	@docker build --tag server .
	@docker images

qa:
	@echo "Checking that our server tests dont fail..."
	@npm run qa