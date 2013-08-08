define([
    "jquery",
    "underscore",
    "marionette",
    "views/collections/mixed.collection.view",
    "views/composite/m-advancedcontentfilter.tags.group.composite.view",
    "views/m-advancedcontentfilter.scale.view",
    "views/m-advancedcontentfilter.recommendations.status.view"
],
    function($, _, Marionette, MixedCollectionView, TagsGroupCompositeView, ScaleView, RecommendationsStatusView) {

        var TagsGroups = MixedCollectionView.extend({

            tagName : "div",
            itemView : TagsGroupCompositeView,
            itemViewType : "model",

            itemViews : {
                scale : ScaleView,
                recommendationStatus : RecommendationsStatusView
            },

            initialize : function() {

                this.listenTo(App.vent,"m-advancedcontentfilter:tag-group:expanded",this.reflectGroupExpandedStatus);
                this.listenTo(this.collection,"reset",this.disableAnimation);
            },

            reflectGroupExpandedStatus : function(data) {

                var containerWidth = this.$el.outerWidth(),
                    viewWidth = data.view.getWidth(),
                    viewsTotal = this.collection.size() - 1,
                    widthCollapsed = (containerWidth - viewWidth)/viewsTotal,
                    isViewCollapsing = false;

                this.children.each(function(view) {

                    if ( view.cid === data.view.cid && view.isExpanded() && !data.status ) {

                        isViewCollapsing = true;
                        return false;
                    }
                });

                this.children.each(function(view) {

                    if ( isViewCollapsing ) {

                        view.setWidth("");
                        view.$el.removeClass("collapsed expanded");
                        view.model.set("expanded",false);
                    }
                    else {

                        if ( view.cid !== data.view.cid ) {

                            view.setWidth( widthCollapsed + "px")
                            view.$el.removeClass("expanded").addClass("collapsed");
                            view.model.set("expanded",false);
                        }
                        else {
                            view.setWidth( viewWidth + "px");
                            view.$el.removeClass("collapsed").addClass("expanded");
                            view.model.set("expanded",true);
                        }
                    }
                });

            },

            disableAnimation : function(value) {

                var method = ( value === undefined || value ) ? "addClass" : "removeClass";
                this.$el[method]("no-animation");
            },

            onShow : function() {

                this.disableAnimation();
                this.expandChildView();
            },

            onRender : function() {

                if ( this._isShown ) {

                    this.expandChildView();
                }
            },

            expandChildView : function() {

                var expandedTagsGroup, viewCid;

                expandedTagsGroup = this.collection.find(function(tagGroupModel){

                    if ( tagGroupModel.get("expanded") ) return true;
                });


                if ( expandedTagsGroup ) {

                    viewCid = this.children._indexByModel[expandedTagsGroup.cid];
                }

                if ( viewCid ) {

                    var data = {
                        view : this.children._views[viewCid],
                        status : true
                    };

                    this.reflectGroupExpandedStatus(data);
                }

                setTimeout(_.bind(this.disableAnimation,this,false),0);
            }

        });

        return TagsGroups;
    });
