# --------------
FROM node:8.15.1 as build_environment_static

RUN npm install -g ember-cli@1.13.15
RUN npm install -g bower@1.8.8
RUN npm install -g phantomjs-prebuilt@2.1.16 --unsafe-perm

RUN \
	git clone https://github.com/facebook/watchman.git &&\
	cd watchman &&\
	git checkout v3.5.0 &&\
	./autogen.sh &&\
	./configure &&\
	make &&\
	make install


# --------------
FROM build_environment_static as build_environment_dynamic

WORKDIR /myapp

COPY package*.json ./
COPY bower.json ./

RUN npm install
RUN bower install --allow-root

# this following copies content of host folder to container
COPY ./ /myapp


# --------------
FROM build_environment_dynamic as build_stage
ARG environment_selector

RUN /usr/local/bin/ember build --environment=$environment_selector
RUN echo "$environment_selector" > /myapp/dist/build_for_environment.txt

# --------------
FROM scratch as build_dist_stage
COPY --from=build_stage /myapp/dist ./


# --------------
FROM build_environment_dynamic as server_stage
EXPOSE 4200 35729
ARG environment_selector

# run ember server on container start
ENTRYPOINT ["/usr/local/bin/ember"]
CMD ["server", "--environment=${environment_selector}"]


# Run the following command to build remote_dev (i.e. kyzikos) and export to dist folder.
# rm -r dist/ || DOCKER_BUILDKIT=1 ENVIRONMENT_SELECTOR=remote_dev docker build -f Dockerfile_build --target build_dist_stage -o dist --build-arg environment_selector=$environment_selector .

# Run the following command to make frontend server that connects to remote_dev (i.e. kyzikos) and makes it available on port 4200.
# DOCKER_BUILDKIT=1 ENVIRONMENT_SELECTOR=remote_dev docker build -f Dockerfile_build --target server_stage --build-arg environment_selector=$environment_selector -t ksi-frontend .
