# Ksi

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/) 1.13.15
* [PhantomJS](http://phantomjs.org/)
* Python2?

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`
* `npm install --save-dev grunt-sass`
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

