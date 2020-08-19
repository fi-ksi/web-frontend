FROM node:8.15.1

RUN npm install -g ember-cli@1.13.15
RUN npm install -g bower@1.8.8
RUN npm install -g phantomjs-prebuilt@2.1.16 --unsafe-perm

# install watchman
RUN \
	git clone https://github.com/facebook/watchman.git &&\
	cd watchman &&\
	git checkout v3.5.0 &&\
	./autogen.sh &&\
	./configure &&\
	make &&\
	make install

EXPOSE 4200 35729
WORKDIR /myapp

COPY package*.json ./
COPY bower.json ./

RUN npm install
RUN bower install --allow-root

COPY ./ /myapp

# run ember server on container start
ENTRYPOINT ["/usr/local/bin/ember"]
CMD ["server", "--environment=remote_dev"]
