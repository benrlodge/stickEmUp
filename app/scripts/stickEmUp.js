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
            return $(this.element).offset().top;
        },
    
        stick: function() {
            if(this.sticky){ return; }
            console.log('stick');

            $(this.element).addClass(this.options.stickyClass);
            this.sticky = true;
        },

        unstick: function() {
            if(!this.sticky){ return; }
            console.log('UNstick');
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
            console.log(this.options);
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














   // cachePositions: function() {

   //          // var scope = this;
   //          // this.cachedOffset = this.elementOffset();

   //          // if (this.options.absoluteAtEl) {
                
   //          //     this.cachedAbsoluteOffset = this.absoluteElOffset() - this.options.absoluteAtOffset;
   //          //     return $(window).load(function() {
   //          //     return scope.cachedAbsoluteOffset = scope.absoluteElOffset() - scope.absoluteAtOffset;
   //          //     });
   //          // }

   //      },




        // checkPositions: function(){

        //     console.log('Window Position:  ' + this.docOffset());



        //     if (this.docOffset() >= this.cachedOffset) {
        //       this.stickEmUp();
        //       if (this.options.absoluteAtEl) {
        //         if (this.docOffset() >= this.cachedAbsoluteOffset) {
        //           this.stickEmAbsolute();
        //         } else {
        //           this.stickEmDownAbsolute();
        //         }
        //       }
        //     }
        //     if (this.docOffset() <= this.cachedOffset) {
        //       return this.stickEmDown();
        //     }
        // },


