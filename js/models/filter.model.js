define([
    "jquery",
    "underscore",
    "backbone",
    "models/child.model",
    "models/years.model",
    "collections/tags.group.collection"
],
    function($, _, Backbone, ChildModel, Years, TagsGroup) {

        var Filter = ChildModel.extend({

            url : "/backend/filter.php",

            type : "POST",

            ownEvent : null,

            subFilters : null,

            defaults : {

                years : null,
                tagsGroups : null
            },

            addSubFilter : function(subFilter) {

                if ( !(subFilter && subFilter.getFilterData) ) return this;

                this.subFilters = this.subFilters || {};

                var subFilterConfig = subFilter.getFilterData();

                if ( subFilterConfig ) {

                    var subFilterName = subFilterConfig.name;

                    // remove given property (object) if any
                    this.subFilters = _.omit(this.subFilters,subFilterName);
                    // set config object by given property
                    this.subFilters[subFilterName] = _.omit(subFilterConfig,"name");
                }

                return this;
            },

            sendFilterToBackend : function() {

                this.fetch({
                    type : this.type,
                    data : {
                        action : "updateFilter",
                        filters : this.subFilters
                    }
                }).success(_.bind(this.filterUpdated,this));
            },

            resetFilterOnBackend : function() {

                this.fetch({
                    type : this.type,
                    data : {
                        action : "resetFilter"
                    }
                }).success(_.bind(this.filterUpdated,this));
            },

            filterUpdated : function() {

                this.subFilters = {}

                // TODO: let the people know (model event > view listens > controller event)

                return this;
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

                    response.tagsGroups = this.get("tagsGroups").reset(response.tagsGroups, { parent : this, parse : true});
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
            },

            resetFilter : function() {

                // tags, years, flag
                var tagsGroups = this.get("tagsGroups"),
                    years = this.get("years"),
                    trigger = false;

                tagsGroups.each(function(model,index,collection){

                    var tags = model.get("tags");

                    if ( tags ) {

                        tags.each(function(model,index,collection){

                            if ( model.get("active") ) {

                                model.set({
                                    active : false
                                },{
                                    silent : true
                                });
                                trigger = true;
                            }
                        })
                    }
                })

                years.resetYears({silent:true});

                if ( !trigger ) trigger = years.hasChanged();
                if ( trigger ) this.trigger("update:filter");
            }
        });

        return Filter;
    });
