define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!templates/layouts/filter.html",
    "views/m-advancedcontentfilter-slider-years",
    "text!templates/views/m-advanced-content-filter-item.html"
],
    function($, _, Backbone, Marionette, Template, YearsSliderView, TagsGroupTemplate) {

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

        var CompositeView = Marionette.CompositeView.extend({

            tagName : "div",
            className : "m-advancedcontentfilter-item",
            itemView : TagView,
            template : TagsGroupTemplate,
            itemViewContainer : "div[data-type='collection']",

            initialize : function() {

                this.collection = this.model.get("tags");
            }
        });

        var TagsGroups = Marionette.CollectionView.extend({

            tagName : "div",
            itemView : CompositeView
        });

        var FilterLayout = Marionette.Layout.extend({

            className : "m-advancedcontentfilter",
            template : Template,
            regions : {

                years : ".m-advanced-content-filter-years",
                tagsGroups : '[data-region="m-advancedcontentfilter-items"]'
            },

            initialize : function() {

                this.listenTo(this.model,"change:year",this.updateFilter);
                this.listenTo(this.model,"change:tagsGroup",this.updateFilter);
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
