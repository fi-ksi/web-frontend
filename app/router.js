import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  //base
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
	this.route('user-profile',{ path: '/profile/:profile_id'});
	this.route('login',       { path: '/login'});
  this.route('registration',{ path: '/registration'});
	this.route('articles',    { path: '/articles'});
  this.route('article',     { path: '/articles/:article_id'});
  this.route('settings',    { path: '/settings'});
  this.route('achievements',{ path: '/achievements'});
  //admin
  this.route('admin/articles', {path: '/admin/articles'});
  this.route('admin/correcting', {path: '/admin/correcting'});
  this.route('admin/e-mail', {path: '/admin/e-mail'});
  this.route('admin/export', {path: '/admin/export'});
  this.route('admin/schools', {path: '/admin/schools'});
  this.route('admin/tasks', {path: '/admin/tasks'});
  this.route('admin/users', {path: '/admin/users'});
  this.route('admin/graph', {path: '/admin/graph'});
  this.route('admin/school-edit', {path: '/admin/school-edit'});
  this.route('admin/user-edit', {path: '/admin/user-edit'});
	this.route('bad_url', { path: '/*badurl' }); // Catch everything else!
});

export default Router;
