$(document).ready(function() {

    $('.route_menu li').on('click', function(event) {
        var target = $('#route .wrapper').children('ul').children('li')[$(this).index() + 1];
        if( target) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top - 90
            }, 700);
        }
        $('.route_menu li.current').removeClass('current');
        $(this).addClass('current');
    });
});
