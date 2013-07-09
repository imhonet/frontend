define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!templates/layouts/filter-current.html",
    "text!templates/views/m-advanced-filter-current-years.html",
    "text!templates/views/m-advanced-filter-current-tag-group.html"
],
    function($, _, Backbone, Marionette, Template, YearsTemplate, TagGroupTemplate) {

        var ResetFilter = Marionette.ItemView.extend({

            template : "Сбросить фильтр",

            events : {

                "click" : "resetFilter"
            },

            resetFilter : function() {

                this.model.resetFilter();
            }
        });

        var Years = Marionette.ItemView.extend({

            template : YearsTemplate,

            className : "tag",

            events : {

                "click" : "resetYears"
            },

            modelEvents : {

                "change" : "render"
            },

            templateHelpers : function() {

                var from = this.model.get("from");
                var to = this.model.get("to");

                var data = {
                    label : ''
                };

                if ( from == to ) {

                    data.label = ( from <= 1960 ) ? "До " + from : from;
                }
                else {

                    var fromLabel, toLabel;

                    fromLabel = ( from <= 1960 ) ? "До " + from : from;
                    toLabel = ( to >= 2013 ) ? 2013 : to;

                    data.label = fromLabel + " — " + toLabel;
                }

                return data;
            },

            resetYears : function() {

                this.model.set({
                    to : this.model.get("defaultTo"),
                    from : this.model.get("defaultFrom")
                })
            }
        });

        var TagView = Marionette.ItemView.extend({

            template : '<%= data.name %><div class="m-advancedcontentfilter-close">x</div>',

            className : "m-advancedcontentfilter-tags",

            events : {

                "click" : "switchStatus"
            },

            switchStatus : function() {

                var status = !this.model.get("active");
                this.model.set("active",status);

            }
        });

        var CompositeView = Marionette.CompositeView.extend({

            tagName : "div",
            itemView : TagView,
            template : TagGroupTemplate,
            className : "m-advancedcontentfilter-bottom-item",

            initialize : function() {

                this.collection = this.model.get("tags");
            },

            showCollection: function(){

                var ItemView,
                    activeTags = [];

                this.collection.each(function(item,index){
                    if ( item.get("active") === true ) activeTags.push(item);
                }, this);

                _.each(activeTags,function(item,index){
                    ItemView = this.getItemView(item);
                    this.addItemView(item, ItemView, index);

                },this);
            }
        });

        var TagsGroups = Marionette.CollectionView.extend({

            tagName : "div",
            itemView : CompositeView,

            showCollection: function(){

                var ItemView,
                    activeGroups = [];

                this.collection.each(function(item,index){

                    var tags = item.get("tags");
                    if ( tags && tags.find(function(tag){ return tag.get("active") === true;}) ) activeGroups.push(item);

                }, this);

                _.each(activeGroups,function(item,index){
                    ItemView = this.getItemView(item);
                    this.addItemView(item, ItemView, index);

                },this);
            }
        });

        var FilterCurrentLayout = Marionette.Layout.extend({

//            className : "m-advanced-content-filter-current",
            template : Template,
            regions : {
                years : "[data-region='m-advanced-filter-current-years']",
                tagsGroups : "[data-region='m-advanced-filter-current-tag-groups']",
                resetFilter : $("[data-region='m-advancedcontentfilter-reset']")
            },

            onShow : function() {

                this.listenTo(this.model,"update:filter",this.showViews);

                this.resetFilter.show(new ResetFilter({
                    model : this.model
                }))

                this.showFilterViews();
            },

            showFilterViews : function() {

                this.years.show(new Years({
                    model : this.model.get("years")
                }));

                this.tagsGroups.show(new TagsGroups({
                    collection : this.model.get("tagsGroups")
                }))

            }
        });

        return FilterCurrentLayout;
    });
