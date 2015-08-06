import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('index',       { path: '/'});
	this.resource('assignment',  { path: '/assignment'});
	this.resource('assignments', { path: '/assignments'});
	this.resource('results',     { path: '/results'});
	this.resource('forum',       { path: '/forum'});
	this.resource('faq',         { path: '/faq'});
	this.resource('profile',     { path: '/profile'});
	this.resource('login',       { path: '/login'});
    this.resource('registration',{ path: '/registration'});
	this.resource('articles',    { path: '/articles'});
    this.resource('article',     { path: '/article/:article_id'});

	this.route('bad_url', { path: '/*badurl' }); // Catch everything else!
});

export default Router;
