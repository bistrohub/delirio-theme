$(document).ready(function () {
    $('img').unveil();

    $('[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $(window).trigger('lookup');
    });

    $('.show-navigation').click(function () {
        $('.navigation').css({ left: 0 });
        $('body').css({ overflow: 'hidden' });
    });

    $('.hide-navigation').click(function () {
        $('.navigation').css({ left: "-100%" });
        $('body').css({ overflow: 'visible' })
    });

    $('.show-quick-order').click(function () {
        $('.quick-order').css({ left: 0 });
        $('body').css({ overflow: 'hidden' });
    });

    $('.hide-quick-order').click(function () {
        $('.quick-order').css({ left: "100%" });
        $('body').css({ overflow: 'visible' })
    });

    $('.order-summary-heading').click(function () {
        var $el = $('.order-summary');
        if ($el.hasClass('open')) {
            $el.removeClass('open');
        } else {
            $el.addClass('open');
        }
    });

    $('.menu-item').popover({
        html: true,
        trigger: 'hover',
        placement: 'auto bottom',
        delay: { show: 500, hide: 0 },
        content: function () {
            return $(this).data('image')
                ? '<img class="popover-image" src="' + $(this).data('image') + '">'
                : null;
        }
    });

    $('.menu-item').click(function () {
        $(this).popover('hide');
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


