$(function(){

    $(document).on('click','.js-open-menu', function () {

        if ($(this).hasClass('is-active')) {

            $(this).removeClass('is-active');
            $('.mobile-menu').removeClass('is-active');

        } else {
            $(this).addClass('is-active');
            $('.mobile-menu').addClass('is-active');
        }

    })


    $(document).on('click', '.js-navigate a', function () {

        var $this = $(this);

        if ($('.mobile-menu').hasClass('is-active')) {
            $('.js-open-menu').removeClass('is-active');
            $('.mobile-menu').removeClass('is-active');
        }

        var elementClick = $this.attr("href");
        var elementGutter = $('.js-site-header').outerHeight();
        var destination = $(elementClick).offset().top - parseInt(elementGutter);
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);

        return false;

    });


});
