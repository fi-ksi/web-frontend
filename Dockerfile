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

# Run the following command to build remote_dev (i.e. kyzikos) and export to dist folder.
# rm -r dist/ || DOCKER_BUILDKIT=1 environment_selector=remote_dev docker build --target build_dist_stage -o dist --build-arg environment_selector=$environment_selector .
