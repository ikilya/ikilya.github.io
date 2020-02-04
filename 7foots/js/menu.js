$(document).ready(function() {
    $('.toggle_menu').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').parent().css('position', '').children('ul').css('transform', '');
        } else {
            $(this).addClass('active').parent().css('position', 'fixed').children('ul').css('transform', 'translateX(0%)');
        }
    });

    $('nav a').click(function () {
        if (!$('.toggle_menu').hasClass('hidden')) {
            $('.toggle_menu').removeClass('active').parent().css('position', '').children('ul').css('transform', '');
        }
    });
})