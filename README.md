# Ksi

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Dev environment

### Docker version

Getting working dev environment used to be problematic, because parts of the web still rely on deprecated libraries. For that reason, `Dockerfile` and `docker-compose` file were created to make it incredibly easier. Now, all you have to do is have docker setup (which is really easy) and run:

```sh
git clone https://github.com/fi-ksi/web-frontend.git
cd web-frontend
git submodule init
git submodule update
docker-compose up -d --build
```

Profit!


#### Docker on Windows - no auto rebuild 
Just one small problem - on Docker for Windows notifications on shared drives/volumes are not fully implemented. That means watchman won't automatically rebuild. After every change you need to manually run the `docker-compose up -d --build` and do full build of the ember website. All docker things are cached, so only the website itself will rebuild.


### Non-docker version

#### Prerequisites

You will need the following things properly installed on your computer. You also need compatible versions not only between those prerequisites, but also with libraries. We strongly recomend using the docker version, or at least looking to it's files to see which versions are used.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/) 1.13.15
* [PhantomJS](http://phantomjs.org/)
* Python2?

#### Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`
* `git submodule init`
* `git submodule update`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build --environment=production` (production for ksi.fi.muni.cz)
* `ember build --environment=remote_dev` (development for kyzikos.fi.muni.cz)

### Deploying

* Run `./deploy-ksi.sh` to deploy at ksi.fi.muni.cz.
* Run `./deploy-dev.sh` to deploy at kyzikos.fi.muni.cz.

### Conventions

* We do not use tabs.
* Tab = 4 spaces.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

