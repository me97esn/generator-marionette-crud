define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a <%=name%> model");
		},
		urlRoot: 'http://localhost:3001/collections/<%=name%>',
		defaults: {},
    });
});
