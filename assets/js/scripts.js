/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {
    $.fn.unveil = function(threshold, callback) {
        var $w = $(window);
        var th = threshold || 0;
        var retina = window.devicePixelRatio > 1;
        var attrib = retina ? "data-src-retina" : "data-src";
        var images = this;
        var loaded;

        this.one("unveil", function() {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
            }
        });

        function unveil() {
            var inview = images.filter(function() {
                var $e = $(this);
                if ($e.is(":hidden")) return;

                var wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();

                return eb >= wt - th && et <= wb + th;
            });

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

        unveil();

        return this;
    };
})(window.jQuery);

$(document).ready(function () {
    // don't use skrollr on mobile / tablet
    if ($(window).width() >= 1480 && typeof(skrollr) === 'object') {
        var s = skrollr.init({
            forceHeight: false,
        });
    }

    $('img').unveil();

    $('[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $(window).trigger('lookup');
    });

    $('.show-navigation').click(function () {
        $('.navigation').css({ left: 0 });
        $('body').css({ overflow: 'hidden' })
    });

    $('.hide-navigation').click(function () {
        $('.navigation').css({ left: "-100%" });
        $('body').css({ overflow: 'visible' })
    });

    $('.show-quick-order').click(function () {
        $('.quick-order').css({ left: 0 });
        $('body').css({ overflow: 'hidden' })
    });

    $('.hide-quick-order').click(function () {
        $('.quick-order').css({ left: "100%" });
        $('body').css({ overflow: 'visible' })
    });

    window.addEventListener('scroll', function (e) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop;
        var shrinkOn = 230;
        var $navbar = $('body');

        if (distanceY > shrinkOn) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });
});


