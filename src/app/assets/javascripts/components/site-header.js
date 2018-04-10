$(function() {

    var headerHeight = $('.js-site-header').outerHeight();

    function headerScrollInit() {

        if ($(window).scrollTop() >= headerHeight) {
            $('.js-site-header').addClass('header-scroll-mod');
        } else {
            $('.js-site-header').removeClass('header-scroll-mod')
        }
    }

    $(window).on('scroll', function () {
        headerScrollInit();
    })
});
