log = function(m){console.log(m);}

log('stickemup');



// #intro


/*!
 * stickEmUp!
 * Original author: @benrlodge
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

    var pluginName = 'stickEmUp',
        defaults = {
            stickOffset: 0
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element 
        // and this.options
        log('oh we init this shit@!!');
        log(this.options);
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );





$('#intro').stickEmUp({
	stickClass: 'farts'
});


