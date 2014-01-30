define([
	'backbone',
	'views/item/<%=name%>View',
	'models/<%=name%>',
	'hbs!tmpl/composite/<%=name %>sView_tmpl',
	'Backbone.ModelBinder'
],
function( Backbone, <%=name %>view, <%=name %>Model, <%=name %>viewTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			this.model = new <%=name %>Model();
			this._modelBinder = this._modelBinder || new Backbone.ModelBinder();
			console.log("initialize a <%=name %>view CompositeView");
		},
		
    	itemView: <%=name %>view,
    	
    	template: <%=name %>viewTmpl,
    	

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: "#<%=name %>View",

		/* Ui events hash */
		events: {
			'click #createNew<%=name %>':'createNew'
		},
		createNew: function(){
			console.log('create:' + JSON.stringify(this.model));
			this.model.save();
		},
		/* on render callback */
		onRender: function() {
			this._modelBinder.bind(this.model, this.el);
		}
	});

});
