import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route('index',       { path: '/'});
	this.route('task',  { path: '/tasks/:task_id'}, function() {
		this.route('statistics');
		this.route('submission');
		this.route('discussion');
		this.route('solution');
		this.route('assignment', {path: ''});
	});
	this.route('tasks', { path: '/tasks'});
	this.route('results',     { path: '/results'});
	this.route('forum',       { path: '/forum'});
	this.route('faq',         { path: '/faq'});
	this.route('profile',     { path: '/profile'});
	this.route('login',       { path: '/login'});
    this.route('registration',{ path: '/registration'});
	this.route('articles',    { path: '/articles'});
    this.route('article',     { path: '/articles/:article_id'});
    this.route('settings',    { path: '/settings'});
    this.route('achievements',    { path: '/achievements'});
	this.route('bad_url', { path: '/*badurl' }); // Catch everything else!
});

export default Router;
