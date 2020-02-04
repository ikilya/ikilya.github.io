$(document).ready(function() {
    $('#routes').slider({menu: false});

    $('.routes_menu li').on('click', function(event) {
        var target = $('.routes_slider').children('li')[$(this).index()];
        if( target) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top - 90
            }, 700);
        }
        $('.routes_menu li.current').removeClass('current');
        $(this).addClass('current');
    });
});
