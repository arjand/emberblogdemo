App = Ember.Application.create();

App.Router.map(function () {
	// add a route for index.html#about
	this.resource('about');
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id' });	
	});
	
});

App.PostsRoute = Ember.Route.extend({
	// model is a method (hook) that is called by
	// ember to ask what model should be used for the route.
	model: function() {
		return posts;
	}
});

/** A route for an individual post. This will allow a user to 
  * directly visit #/posts/1
 **/
App.PostRoute = Ember.Route.extend({
	model: function(params) {
		// using ember's findBy method
		return posts.findBy('id', params.post_id);
	}
});

/**
 * Ember Controller: Stores application state and responds to events from your templates.
**/
App.PostController = Ember.ObjectController.extend({
	isEditing: false,
	
	edit: function() {
		this.set('isEditing', true);
	},
	doneEditing: function() {
		this.set('isEditing', false);
	}
	
});

/**
  * Adds a handlebar helper to format the date using Moment.js
 **/
Ember.Handlebars.helper('format-date', function(date) {
	return moment(date).fromNow();
});

var showdownConverter = new Showdown.converter();
/**
  * Adds a handlebar helper to format the markdown text using showdown library
 **/
Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdownConverter.makeHtml(input));
});

var posts = [{
  id: '1',
  title: "Rails is Omakase",
  author: { name: "d2h" },
  date: new Date('12-27-2012'),
  excerpt: "There are lots of à la carte software environments in this world. Places where in order to eat, you must first carefully look over the menu of options to order exactly what you want.",
  body: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
}, {
  id: '2',
  title: "The Parley Letter",
  author: { name: "d2h" },
  date: new Date('12-24-2012'),
  excerpt: "My [appearance on the Ruby Rogues podcast](http://rubyrogues.com/056-rr-david-heinemeier-hansson/) recently came up for discussion again on the private Parley mailing list.",
  body: "A long list of topics were raised and I took a time to ramble at large about all of them at once. Apologies for not taking the time to be more succinct, but at least each topic has a header so you can skip stuff you don't care about.\n\n### Maintainability\n\nIt's simply not true to say that I don't care about maintainability. I still work on the oldest Rails app in the world."  
}];