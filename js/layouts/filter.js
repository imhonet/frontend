define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!templates/layouts/filter.html",
    "views/m-advancedcontentfilter-slider-years",
    "views/mixed.collection.view",
    "text!templates/views/m-advanced-content-filter-scale-view.html",
    "text!templates/views/m-advanced-content-filter-recommendations-status-view.html",
    "text!templates/views/m-advanced-content-filter-item.html"
],
    function($, _, Backbone, Marionette, Template, YearsSliderView, MixedCollectionView, ScaleViewTemplate, RecommendationsStatusViewTemplate, TagsGroupTemplate) {

        var TagView = Marionette.ItemView.extend({

            template : '<%= data.name %><div class="m-advancedcontentfilter-close">x</div>',

            className : "m-advancedcontentfilter-tags",

            events : {

                "click" : "switchStatus"
            },

            modelEvents : {

                "change" : "render"
            },

            onRender : function() {

                if ( this.model.get("isBlock") ) this.$el.addClass("m-advancedcontentfilter-tags-block");
                if ( this.model.get("active") ) this.$el.addClass("active");
            },

            switchStatus : function() {

                var status = !this.model.get("active");
                this.model.set("active",status);
            }
        });

        var ScaleView = Marionette.ItemView.extend({

            tagName : "div",
            className : "m-advancedcontentfilter-item",
            template : ScaleViewTemplate,

            events : {

                "click .m-advancedcontentfilter-title" : "setExpandedStatus"
            },

            initialize : function() {

                this.listenTo(App.vent,"advanced-content-filter:tag-group:status",this.reflectExpandedStatus);
            },

            reflectExpandedStatus : function(eventData) {

                this.$el.removeClass("hide show");

                if ( eventData.cid === this.cid ) {

                    if ( eventData.status ) {

                        this.$el.addClass("show");
                    }

                    this.model.set("expanded",eventData.status);
                }
                else {

                    if ( eventData.status ) {

                        this.$el.addClass("hide");
                        this.model.set("expanded",false);
                    }
                }
            },

            setExpandedStatus : function() {

                var expanded = !this.model.get("expanded");

                App.vent.trigger("advanced-content-filter:tag-group:status",{
                    cid : this.cid,
                    status : expanded
                })
            }
        });

        var RecommendationsView = ScaleView.extend({

            className : "m-advancedcontentfilter-item m-advancedcontentfilter-item-recomendation",
            template : RecommendationsStatusViewTemplate
        })

        var CompositeView = Marionette.CompositeView.extend({

            tagName : "div",
            className : "m-advancedcontentfilter-item",
            itemView : TagView,
            template : TagsGroupTemplate,
            itemViewContainer : "div[data-type='collection']",

            events : {

                "click .m-advancedcontentfilter-title" : "setExpandedStatus"
            },

            initialize : function() {

                this.listenTo(App.vent,"advanced-content-filter:tag-group:status",this.reflectExpandedStatus);
                this.collection = this.model.get("tags");
            },

            reflectExpandedStatus : function(eventData) {

                this.$el.removeClass("hide show");

                if ( eventData.cid === this.cid ) {

                    if ( eventData.status ) {

                        this.$el.addClass("show");
                    }

                    this.model.set("expanded",eventData.status);
                }
                else {

                    if ( eventData.status ) {

                        this.$el.addClass("hide");
                        this.model.set("expanded",false);
                    }
                }
            },

            setExpandedStatus : function() {

                var expanded = !this.model.get("expanded");

                App.vent.trigger("advanced-content-filter:tag-group:status",{
                    cid : this.cid,
                    status : expanded
                })
            }
        });

        var TagsGroups = MixedCollectionView.extend({

            tagName : "div",
            itemView : CompositeView,
            itemViewType : "model",

            itemViews : {
                scale : ScaleView,
                recommendationStatus : RecommendationsView
            },

            onRender : function() {

                var expandedTagsGroup, viewCid;

                expandedTagsGroup = this.collection.find(function(tagGroupModel){

                    if ( tagGroupModel.get("expanded") ) return true;
                });

                if ( expandedTagsGroup ) {

                    viewCid = this.children._indexByModel[expandedTagsGroup.cid];
                }

                if ( viewCid ) {

                    App.vent.trigger("advanced-content-filter:tag-group:status",{
                        cid : viewCid,
                        status : true
                    })
                }
            }
        });

        var FilterLayout = Marionette.Layout.extend({

            className : "m-advancedcontentfilter",
            template : Template,
            regions : {

                years : ".m-advanced-content-filter-years",
                tagsGroups : '[data-region="m-advancedcontentfilter-items"]'
            },

            initialize : function() {

                this.listenTo(this.model,"update:filter",this.updateFilter);
            },

            updateFilter : function() {

                this.model.save();
            },

            onShow : function() {

                this.years.show(new YearsSliderView({
                    model : this.model.get("years")
                }));
                this.tagsGroups.show(new TagsGroups({
                    collection : this.model.get("tagsGroups")
                }));
            }
        });

        return FilterLayout;
    });
