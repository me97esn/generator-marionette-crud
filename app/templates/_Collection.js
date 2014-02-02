define([
	'backbone',
	'models/<%=name%>'
],
function( Backbone, <%=name%> ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a <%=name%> collection");
		},
		url: 'http://localhost:3001/collections/<%=name%>',
		model: <%=name%>
	});
});
