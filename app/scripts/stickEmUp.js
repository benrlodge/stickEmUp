/*!
 * stickEmUp!
 * Original author: @benrlodge
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

    'use strict';

    // Defaults
    var pluginName = 'stickEmUp',
        defaults = {
            stickyClass: 'stickEmUp',
            el: '',
            offset: 0,
            stickOffset: 0,
            stickAtEl: '',
            callback: ''
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Methods
    Plugin.prototype = {
        sticky: false,
        elCachedPosition: '',
        pastOffset: 0,
        direction: '',

        theStateOfThings: function(){
            var dos = this.docOffset();
            var eos = this.elOffset();
            var dir = this.direction;

            return {
                docOffset: dos,
                elOffset: eos,
                direction: dir
            };
        },

        docOffset: function() {
            return $(document).scrollTop();
        },

        elOffset: function() {
            return $(this.element).offset().top - this.options.stickOffset;
        },
    
        stick: function() {
            if(this.sticky){ return; }
            $(this.element).addClass(this.options.stickyClass);
            this.sticky = true;
        },

        unstick: function() {
            if(!this.sticky){ return; }
            $(this.element).removeClass(this.options.stickyClass);
            this.sticky = false;
        },

        cachePositions: function(){
            this.elCachedPosition = this.elOffset();
        },
  
        checkPositions: function(){

            var docOff = this.docOffset();
            
            // set direction
            this.direction = this.pastOffset ? 'down' : 'up';
            this.pastOffset = docOff;

            // check stickiness
            if (docOff >= this.elCachedPosition){
                this.stick();
            }
            else{
                this.unstick();
            }

            // send callback
            var things = this.theStateOfThings();
            if (typeof this.options.callback === 'function') { // make sure the callback is a function
                this.options.callback(things);
            }

        },

        events: function(){
            var scope;
            scope = this;
            $(window).scroll(function() {
                scope.checkPositions();
            });

        },

        init: function(){
            this.cachePositions();
            this.events();
        }
    };



    // Build the Plugin
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
