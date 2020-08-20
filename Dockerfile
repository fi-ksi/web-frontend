FROM node:8.15.1

RUN npm install -g ember-cli@1.13.15
RUN npm install -g bower@1.8.8
RUN npm install -g phantomjs-prebuilt@2.1.16 --unsafe-perm

# install watchman
# RUN \
# 	git clone https://github.com/facebook/watchman.git &&\
# 	cd watchman &&\
# 	git checkout v3.5.0 &&\
# 	./autogen.sh &&\
# 	./configure &&\
# 	make &&\
# 	make install

RUN mkdir watchman_tmp && \
	cd watchman_tmp && \
	wget https://github.com/facebook/watchman/releases/download/v2020.08.17.00/watchman-v2020.08.17.00-linux.zip && \
	unzip watchman-*-linux.zip &&\
	mkdir -p /usr/local/{bin,lib} /usr/local/var/run/watchman && \
	cd watchman-v2020.08.17.00-linux && \
	cp bin/* /usr/local/bin &&\ 
	cp lib/* /usr/local/lib &&\
	chmod 755 /usr/local/bin/watchman &&\
	chmod 2777 /usr/local/var/run/watchman 

# RUN apt-get update
# RUN apt-get install -y autoconf automake build-essential python-dev

# RUN \
# 	git clone https://github.com/facebook/watchman.git -b v4.9.0 --depth 5 &&\
# 	cd watchman &&\
# 	./autogen.sh &&\
# 	./configure --without-python --without-pcre --enable-lenient &&\
# 	make &&\
# 	make install

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
