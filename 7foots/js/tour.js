$(document).ready(function() {

    $('.tour_menu li').on('click', function(event) {
        var target = $('#tour .wrapper').children('ul').children('li')[$(this).index() + 1];
        if( target) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top - 90
            }, 700);
        }
        $('.tour_menu li.current').removeClass('current');
        $(this).addClass('current');
    });
});
