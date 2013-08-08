define([
    "underscore",
    "backbone",
    "models/child.model"
],
    function(_, Backbone, ChildModel) {

        var YearsModel = ChildModel.extend({

            parentEvent : "filter:update",
            localData : {},

            defaults : {

                name : "years"
            },

            // API method for parent AdvancedContentFilter model
            getFilterData : function() {

                return {
                    name : this.get("name"),
                    from : this.get("from"),
                    to : this.get("to")
                }
            },

            setExtraAttributes : function() {

                var from = this.get("from"),
                    to = this.get("to"),
                    defaultFrom = this.get("defaultFrom"),
                    defaultTo = this.get("defaultTo");

                var extraAttributes = this.localData;

                if ( from == to ) {

                    this.extraAttributes = ( from <= 1960 ) ? "До " + from : from;
                }
                else {

                    var fromLabel, toLabel;

                    fromLabel = ( from <= 1960 ) ? "До " + from : from;
                    toLabel = ( to >= 2013 ) ? 2013 : to;

                    extraAttributes.label = fromLabel + " — " + toLabel;
                }

                extraAttributes.noCloseButton = from === defaultFrom && to === defaultTo;
            },

            resetYears : function(options) {

                this.set({
                    from : this.get("defaultFrom"),
                    to : this.get("defaultTo")
                },options);
            }

        });

        return YearsModel;
    });
