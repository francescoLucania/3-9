"use strict";

var enable = {
    mq: true,
    mqDevice: true,

    interactMultiple: true,

    jQueryUI: {
        autocomplete: true,
        datepicker: true,
        selectmenu: true
    },

    components: {
        fonts: true,
        fontsRubleSans: true,
        fontsRubleSerif: true,
        icons: true,
        wysiwyg: true
    }
};
'use strict';

// Responsive
var mqBreakpoints = [['sm', 767], ['md', 768], ['lg', 1025]];
'use strict';

// Create mq
var mq = {};

function createMq(array) {
    var mqDevice = enable.mqDevice ? 'device-' : '';

    array.forEach(function (element, index) {
        var mqRange = index === 0 ? 'max' : 'min';

        mq[element[0]] = {
            int: element[1],
            str: '(' + mqRange + '-' + mqDevice + 'width: ' + element[1] + 'px)'
        };
    });
}

if (enable.mq) {
    createMq(mqBreakpoints);
}

// Interact multiple
var interactMultiple = function interactMultiple(selector, hoverClass, activeClass) {
    if (!Modernizr.touchevents) {
        $(document).on('mouseenter mouseleave', selector, function (e) {
            $(selector).filter('[href="' + $(this).attr('href') + '"]').toggleClass(hoverClass, e.type === 'mouseenter');
        }).on('mousedown mouseup', selector, function (e) {
            $(selector).filter('[href="' + $(this).attr('href') + '"]').toggleClass(activeClass, e.type === 'mousedown');
        });
    }
};

if (enable.interactMultiple) {
    interactMultiple('.js-hover', 'hover', 'active');
}

// Debounced Resize() jQuery Plugin
// https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function ($, sr) {
    var debounce = function debounce(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this;
            var args = arguments;

            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            }

            if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');
'use strict';

if (enable.jQueryUI.autocomplete === true) {
    var availableTags = ['ActionScript', 'AppleScript', 'Asp', 'BASIC', 'C', 'C++', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'Python', 'Ruby', 'Scala', 'Scheme'];
    var $autocomplete = $('.js-autocomplete-input');

    $autocomplete.autocomplete({
        source: availableTags,
        open: function open(event) {
            $(event.target).addClass('ui-autocomplete-input-opened');
        },
        close: function close(event) {
            $(event.target).removeClass('ui-autocomplete-input-opened');
        }
    });

    $(window).smartresize(function () {
        $autocomplete.autocomplete('close');
    });
}
"use strict";

if (enable.jQueryUI.datepicker === true) {
    var datepickerSetMinWidth = function datepickerSetMinWidth(input, dpDiv) {
        setTimeout(function () {
            $(dpDiv).css('min-width', '').css('min-width', $(input).outerWidth());
        }, 0);
    };

    // Force Datepicker open always under input


    // Localization
    $.datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3C;Пред",
        nextText: "След&#x3E;",
        currentText: "Сегодня",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weekHeader: "Нед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };

    $.datepicker.setDefaults($.datepicker.regional.ru);

    // Datepicker
    var $datepicker = $('.js-datepicker-input');

    $.extend($.datepicker, {
        _checkOffset: function _checkOffset(inst, offset) {
            return offset;
        }
    });

    $datepicker.datepicker({
        prevText: '',
        nextText: '',
        beforeShow: function beforeShow(input, inst) {
            $(input).addClass('hasDatepickerFocus');

            datepickerSetMinWidth(input, inst.dpDiv);
        },
        onChangeMonthYear: function onChangeMonthYear(year, month, inst) {
            datepickerSetMinWidth(inst.input, inst.dpDiv);
        },
        onClose: function onClose(dateText, inst) {
            $(inst.input).removeClass('hasDatepickerFocus');
        },
        onSelect: function onSelect(dateText, inst) {
            $(inst.input).removeClass('hasDatepickerFocus');
        }
    });

    $(window).smartresize(function () {
        $datepicker.datepicker('hide');
    });
}
'use strict';

if (enable.jQueryUI.selectmenu === true) {
    var $selectmenu = $('.js-selectmenu-select');

    $selectmenu.selectmenu({
        create: function create(event) {
            var $select = $(event.target);
            var $button = $(event.target.nextSibling);

            $('#' + event.target.id + '-menu').css('max-width', $button.outerWidth());

            if ($select.find('option:first-child').is(':disabled')) {
                $select.next('.ui-selectmenu-button').find('.ui-selectmenu-text').addClass('ui-state-placeholder');
            }
        }
    });

    $(window).smartresize(function () {
        $selectmenu.selectmenu('close');
    });
}
'use strict';

if (enable.components.fonts === true) {

    if (enable.components.fontsRubleSans === true) {
        var fontALSRublArial = new FontFaceObserver('ALSRubl-Arial');

        fontALSRublArial.load().then(function () {
            // console.log('ALSRubl-Arial has loaded.');
        });
    }

    if (enable.components.fontsRubleSerif === true) {
        var fontALSRublTimes = new FontFaceObserver('ALSRubl-Times');

        fontALSRublTimes.load().then(function () {
            // console.log('ALSRubl-Times has loaded.');
        });
    }
}
"use strict";

if (enable.components.icons === true) {
    svg4everybody();
}
'use strict';

if (enable.components.wysiwyg === true) {
    var $wysiwyg = $('.js-wysiwyg');

    // Img
    $wysiwyg.find('> p > img').each(function () {
        $(this).css({
            height: '',
            width: ''
        }).unwrap();
    });

    // Table
    $wysiwyg.find('> table').each(function () {
        $(this).wrap('<div class="wysiwyg__table"/>');
    });

    // Video (Youtube, Vimeo)
    $wysiwyg.find('> iframe[src*="vimeo"], > iframe[src*="youtube"]').each(function () {
        $(this).wrap('<div class="wysiwyg__video"/>');
    });
}
'use strict';

function scrollSize() {
    var css = {
        'width': '200px',
        'height': '200px',
        'margin': '0',
        'padding': '0',
        'border': 'none'
    };

    var inner = $('<div>').css($.extend({}, css));
    var outer = $('<div>').css($.extend({
        'position': 'absolute',
        'top': '-1000px',
        'left': '-1000px',
        'overflow': 'scroll'
    }, css)).append(inner).appendTo('body').scrollTop(1000).scrollLeft(1000);

    var scrollSize = {
        'width': outer.offset().left - inner.offset().left || 0,
        'height': outer.offset().top - inner.offset().top || 0
    };

    outer.remove();

    return scrollSize;
}
'use strict';

// Debounced Resize() jQuery Plugin
// https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function ($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function debounce(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            }

            if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    // smartresize
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');
'use strict';

$(function () {
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
'use strict';

$(function () {

    function promoHeight() {
        $('.js-promo').css('height', $(window).height());
    }

    var parent = document.getElementsByClassName('js-promo')[0];
    var items = document.getElementsByClassName('js-promo-item');
    var center = {
        x: parent.offsetWidth / 2,
        y: parent.offsetHeight / 2
    };
    parent.onmousemove = function (event) {

        for (var i = 0; i < items.length; i++) {
            items[i].setAttribute('style', 'transform: translate3d(' + Math.round((center.x - event.pageX) / 20) + 'px, ' + Math.round((center.y - event.pageY) / 20) + 'px, 0) scale(1.1); ');
        }
    };

    $(window).on('load', function () {
        promoHeight();
    });

    $(window).smartresize(function () {
        promoHeight();
    });
});