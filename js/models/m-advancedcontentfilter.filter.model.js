define([
    "underscore",
    "backbone",
    "models/m-advancedcontentfilter.years.model",
    "collections/m-advancedcontentfilter.tags.group.collection"
],
    function(_, Backbone, YearsModel, AdvancedContentFilterTagsGroupCollection) {

        var Filter = Backbone.Model.extend({

            url : "/backend/filter.php",

            type : "POST",

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

                this.trigger("filter:updated");

                return this;
            },

            parse : function(response, options) {

                if ( !this.get("years") ) {

                    response.years = new YearsModel(response.years,{ parent : this })
                }
                else {
                    response.years = this.get("years").set(response.years);
                }

                if ( !this.get("tagsGroups") ) {

                    response.tagsGroups = new AdvancedContentFilterTagsGroupCollection(response.tagsGroups,{ parent : this, parse : true});
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
            }
        });

        return Filter;
    });
