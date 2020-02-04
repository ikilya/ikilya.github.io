$(document).ready(function() {
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 90
                }, 700);
        }
        $('.about_menu li.current').removeClass('current');
        $(this).parent().addClass('current');
    });

    var stop = $('header').height()  + $('#about').height() - 2 * $('.about_menu').height();
    var isStop = false;

    window.onscroll = function() {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > stop && !isStop) {
            $('.about_menu_wrapper').addClass('stop');
            isStop = true;
        } else if (scrolled <= stop) {
            $('.about_menu_wrapper').removeClass('stop');
            isStop = false;
        }
    }
});
