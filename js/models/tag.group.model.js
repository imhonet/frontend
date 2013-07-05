define([
    "jquery",
    "underscore",
    "backbone",
    "collections/tag.collection"
],
    function($, _, Backbone, Tags) {

        var TagsGroup = Backbone.Model.extend({

            defaults : {

                name : null,
                expanded : false,
                tags : null
            },

            constructor : function(attributes, options) {

                if ( options && options.parent ) {

                    this.parent = options.parent;
                }

                Backbone.Model.apply(this,arguments);
            },

            toJSON : function() {

                // clone all attributes
                var attributes = _.clone(this.attributes);

                // go through each attribute
                $.each(attributes, function(key, value) {

                    // check if we have some nested object with a toJSON method
                    if ( value && _.isFunction(value.toJSON) ) {
                        // execute toJSON and overwrite the value in attributes
                        attributes[key] = value.toJSON();
                    }
                });

                return attributes;
            },

            initialize : function() {

                this.listenTo(this,"change:tags",this._notifyParent);
            },

            _notifyParent : function() {

                if ( this.parent && this.parent.trigger ) {

                    this.parent.trigger("change:tagsGroup",this);
                }
            },

            parse : function(response, options) {

                response.tags = new Tags(response.tags,{ parent : this });

                return response;
            }
        });

        return TagsGroup;
    });
