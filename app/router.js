import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  //base
  this.route('index',       { path: '/'});
  this.route('task',  { path: '/ulohy/:task_id'}, function() {
    this.route('statistics', { path: 'statistiky'});
    this.route('discussion', { path: 'diskuse'});
    this.route('evaluation', { path: 'hodnoceni'});
    this.route('solution',   { path: 'reseni'});
    this.route('assignment', {path: ''});
  });
  this.route('tasks', { path: '/ulohy'});
  this.route('results',     { path: '/vysledky'});
  this.route('forum',       { path: '/forum'});
  this.route('thread',      { path: '/forum/:thread_id'});
  this.route('about',         { path: '/o-ksi'});
  this.route('profile',     { path: '/profil'});
  this.route('user-profile',{ path: '/profil/:profile_id'});
  this.route('registration',{ path: '/registrace'});
  this.route('articles',    { path: '/novinky'});
  this.route('article',     { path: '/novinky/:article_id'});
  this.route('settings',    { path: '/nastaveni'}, function() {
    this.route('personal', { path: ''});
    this.route('password', { path: 'zmena-hesla'});
  });
  this.route('achievements',{ path: '/achievementy'});
  this.route('forgot-password',{ path: '/zapomenute-heslo'});
  this.route('login', { path: '/prihlaseni'});
  //admin
  this.route('admin/articles', {path: '/admin/articles'});
  this.route('admin/article-edit', {path: '/admin/articles/:article_id'});

  this.route('admin/correcting', {path: '/admin/opravovani'});
  this.route('admin/e-mail', {path: '/admin/e-mail'});
  this.route('admin/export', {path: '/admin/export'});

  this.route('admin/schools', {path: '/admin/schools'});
  this.route('admin/school-edit', {path: '/admin/school-edit'});

  this.route('admin/tasks', {path: '/admin/tasks'});
  this.route('admin/task-create', {path: '/admin/tasks-create/:wave_id'});
  this.route('admin/task-edit', {path: '/admin/tasks/:task_id'});

  this.route('admin/users', {path: '/admin/users'});
  this.route('admin/user-edit', {path: '/admin/user-edit'});

  this.route('admin/years', {path: '/admin/years'});
  this.route('admin/year-edit', {path: '/admin/years/:year_id'});
  this.route('admin/year-create', {path: '/admin/year-create'});

  this.route('admin/waves', {path: '/admin/waves'});
  this.route('admin/wave-edit', {path: '/admin/waves/:wave_id'});
  this.route('admin/wave-create', {path: '/admin/wave-create'});

  this.route('admin/achievements', {path: '/admin/achievements'});
  this.route('admin/achievement-grant', {path: '/admin/achievements/grant'});
  this.route('admin/achievement-edit', {path: '/admin/achievement-edit'});

  this.route('admin/forum', { path: '/admin/forum'});

  this.route('bad_url', { path: '/*badurl' }); // Catch everything else!
});

export default Router;
