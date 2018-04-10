$(function() {

    function promoHeight() {
        $('.js-promo').css('min-height', $(window).height());
    }

    var parent = document.getElementsByClassName('js-promo')[0];
    var items = document.getElementsByClassName('js-promo-item');
    var center = {
        x: parent.offsetWidth / 2,
        y: parent.offsetHeight / 2
    }
    parent.onmousemove = function (event) {

        for (var i = 0; i < items.length; i++) {
            items[i].setAttribute('style', 'transform: translate3d(' +
                Math.round((center.x - event.pageX) / 20) + 'px, ' +
                Math.round((center.y - event.pageY) / 20) + 'px, 0) scale(1.1); ');
        }
    }

    $(window).on('load', function () {
        promoHeight()
    });

    $(window).smartresize(function () {
        promoHeight()
    });
});
