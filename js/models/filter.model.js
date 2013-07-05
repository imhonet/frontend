define([
    "jquery",
    "underscore",
    "backbone",
    "models/years.model",
    "collections/tags.group.collection"
],
    function($, _, Backbone, Years, TagsGroup) {

        var Filter = Backbone.Model.extend({

            url : "/backend/filter.php",

            defaults : {

                years : null,
                tagsGroups : null
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

            parse : function(response, options) {

                if ( !this.get("years") ) {

                    response.years = new Years(response.years,{ parent : this })
                }
                else {
                    response.years = this.get("years").set(response.years);
                }

                if ( !this.get("tagsGroups") ) {

                    response.tagsGroups = new TagsGroup(response.tagsGroups,{ parent : this, parse : true});
                }
                else {

                    response.tagsGroups = this.get("tagsGroups").reset(response.tagsGroups, { parse : true });
                }

                return response;
            },

            sync : function(method, model, options) {

                var lastXHR = model._lastXHR && model._lastXHR[method];

                if ( lastXHR && lastXHR.readyState !== 4 ) {

                    if ( !( options && options.safe === true ) ) {

                        lastXHR.abort('stale');
                    }
                }

                if ( !model._lastXHR ) model._lastXHR = {};

                return model._lastXHR[method] = Backbone.sync.apply(this, arguments);
            }
        });

        return Filter;
    });
