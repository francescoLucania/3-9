$(function() {
    $('.js-heroes-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true
        // asNavFor: '.js-heroes-slider-nav'
    });

    $('.js-heroes-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        asNavFor: '.js-heroes-slider',
        dots: true,
        prevArrow: '<button class="slick-arrow slick-prev"><img src="img/arrow.png" alt=""></button>',
        nextArrow: '<button class="slick-arrow slick-next"><img src="img/arrow.png" alt=""></button>',
        focusOnSelect: true
    });
});
