#FROM node:4.2.3
#FROM node:4.9.1
FROM node:8.15.1


# Based on https://github.com/danlynn/ember-cli/blob/1.13.15/Dockerfile

# Note: npm is v2.14.10
RUN npm install -g ember-cli@1.13.15
#RUN npm install -g bower@1.7.1
RUN npm install -g bower@1.8.8

# Originally there was version 1.9.19, but no such package exists now.
RUN npm install -g phantomjs-prebuilt --unsafe-perm


# install watchman
RUN \
	git clone https://github.com/facebook/watchman.git &&\
	cd watchman &&\
	git checkout v3.5.0 &&\
	./autogen.sh &&\
	./configure &&\
	make &&\
	make install

#FROM fi-ksi-basic-environment

EXPOSE 4200 35729
WORKDIR /myapp

COPY package*.json ./
COPY bower.json ./

#WORKDIR /install

RUN npm install
RUN bower install --allow-root

COPY ./ /myapp

# run ember server on container start
ENTRYPOINT ["/usr/local/bin/ember"]
CMD ["server", "--environment=remote_dev"]

# ENTRYPOINT ["/bin/bash"]
