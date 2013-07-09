define([
    "jquery",
    "underscore",
    "backbone",
    "models/tag.model"
],
    function($, _, Backbone, Tag) {

        var Tags = Backbone.Collection.extend({

            model : Tag,
            parent : null,

            constructor : function(models, options) {

                if ( options && options.parent ) {

                    this.parent = options.parent;
                }

                Backbone.Collection.apply(this,arguments);
            },

            initialize : function() {

                this.listenTo(this,"change:active",this._notifyParent);
            },

            _notifyParent : function() {

                if ( this.parent && this.parent.trigger ) {

                    this.parent.trigger("change",this);
                }
            }
        });

        return Tags;
    });
