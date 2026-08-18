function checkMenuAlignment(menuDropdown) {
    menuDropdown.removeClass('right');
    var menubarright = $('nav.navbar').offset().left + ($('nav.navbar').width() - 100);
    var dropdownright = menuDropdown.offset().left + menuDropdown.width();
    if (dropdownright > menubarright) {
        menuDropdown.addClass('right');
    }
}

function reduceSize(menuDropdown) {
    if (menuDropdown.width() > 300) {
        menuDropdown.addClass('max-dropdown-width');
    }
}

function elemAligner(parent, elements) {
    elements.forEach(function(elem) {
        parent.find(elem).height('auto');
        var items = parent.find(elem).toArray();
        var rowElemHeight = 0;
        var progress = 0;
        for (var i = 0; i < items.length; i++) {
            var item = $(items[i]);
            if (i % 3 == 0) {
                rowElemHeight = item.height();
                progress = i;
            } else if (i % 3 == 1 && i + 1 < items.length) {
                if (item.height() > rowElemHeight) rowElemHeight = item.height();
            } else {
                if (item.height() > rowElemHeight) rowElemHeight = item.height();
                for (var j = i; j >= progress; j--) {
                    $(items[j]).height(rowElemHeight);
                }
            }
        }
    });
}

function videoTabSlick($videotab) {
    $videotab.slick({
        slidesToShow: 5,
        infinite: false,
        arrow: true,
        responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
}

function scrollTo(elem) {
    if (elem != '#' && elem != '' && $(elem).length) {
        $('html').animate({
            scrollTop: $(elem).offset().top
        }, 'slow');
    }
}

function changeVideo($thisvideo, autoplay) {
    if (autoplay === undefined) {
        autoplay = false;
    }
    var autoplay_ = '';
    if (autoplay) autoplay_ = 'autoplay=1&amp;'
    var src = 'https://www.youtube.com/embed/' + $thisvideo.data('video-id') + '?' + autoplay_ + 'modestbranding=1&amp;showinfo=0;rel=0';
    var videoItem = $thisvideo.closest('.landing-item');
    var title = videoItem.find('[data-video=title]').text();
    var duration = videoItem.find('[data-video=duration]').text();
    $('#video-chosen [data-video=src]').attr('src', src);
    $('#video-chosen [data-video=title]').text(title);
    $('#video-chosen [data-video=duration]').text(duration);
    $('html').animate({
        scrollTop: $('#video-chosen').offset().top - 16
    });
}

function search(searchString) {
    if (searchString != '') {
        window.open("/singaporebudget/search?q=" + escape(searchString), "_self");
    }
}

$(function() {
    // menu
    $('#menu .is-hoverable > a.navbar-link').after('<span class="sgds-icon sgds-icon-chevron-down menu-toggler"></span>');
    $('.navbar-menu .menu-toggler').on('click', function() {
        $(this).next('ul').slideToggle();
        $(this).toggleClass('sgds-icon-chevron-down').toggleClass('sgds-icon-chevron-up');
    });
    $('.is-hoverable').on('mouseenter', function() {
        if ($(window).width() > 1023) {
            reduceSize($(this).children('.navbar-dropdown'));
            checkMenuAlignment($(this).children('.navbar-dropdown'));
        }
    });

    // Add external icon
    $('a[target="_blank"]:not(:has(img, span:empty))').each(function() {
        if (this.host !== window.location.host) {
            $(this).append('<span class="sgds-icon sgds-icon-external"></span>');
        }
    })

    // search
    $("#search-activate").on("click", function() {
        $(".sgds-search").slideToggle();
    });

    $("#search-button").on("click", function(event) {
        event.preventDefault();
        search($("#nav-search").val());
    });

    $("#nav-search").on("keypress", function(event) {
        if (event.which == 13) {
            event.preventDefault();
            search($("#nav-search").val());
        }
    });

    $("#nav-search-mobile").on("keypress", function(event) {
        if (event.which == 13) {
            event.preventDefault();
            search($("#nav-search-mobile").val());
        }
    });

    // Back to top
    $('#scrollToTop').on('click', function() {
        $('html').animate({
            scrollTop: 0
        }, 'slow');
    });

    // notification
    $('#cancel-notification').on('click', function() {
        $(this).closest('.sgds-notification').slideUp();
    })

    $('.homepage-banner').on('init', function() {
        $('.homepage-banner_controls').append($('.homepage-banner_controls').find('.slick-next'));
    });
    $(".homepage-banner").slick({
        arrows: true,
        dots: true,
        fade: true,
        adaptiveHeight: true,
        appendArrows: $('.homepage-banner_controls'),
        appendDots: $('.homepage-banner_controls'),
    });

    // table
    $('table:not(.aspCheckboxTable):not(.no-auto-table)').addClass('table table-striped').wrap('<div class="table-responsive"></div>');

    // tab
    $(".tab-container .tabs .tab-item").on("click", function() {
        if ($(this).closest('.video-selector').length) {
            $(this).closest('.video-selector').find(".tab-item").removeClass("is-active");
            $(this).addClass("is-active");
            var videoTab = $(this).find('a').attr('href');
            $(this).closest('.tab-container').find('.tab-content-item').removeClass("is-active");
            $(videoTab).addClass("is-active");
        } else {
            $(this).closest('.tab-container').find(".tab-item").removeClass("is-active");
            $(this).addClass("is-active");
            var selectedNav = $(this).find('a').data('tab');
            $(this).closest('.tab-container').find(".tab-content-item").removeClass("is-active");
            $(this).closest('.tab-container').find('.tab-content-item[data-panel="' + selectedNav + '"]').addClass("is-active");
        }
    });


    $('.video-selections [data-video-id]').on('click', function(e) {
        e.preventDefault();
        changeVideo($(this), false);
    });

    if ($(location).attr("hash") && $('div[data-video-id="' + $(location).attr("hash").slice(1) + '"]').length) {
        var selectedVideo = $('div[data-video-id="' + $(location).attr("hash").slice(1) + '"]');
        if (!selectedVideo.is(':visible')) {
            var tabpanelId = selectedVideo.closest('.tab-content-item').attr('id');
            selectedVideo.closest('.tab-container').find('a[href="#' + tabpanelId + '"]').click();
        }
        changeVideo($(selectedVideo), false);
    } else if ($(location).attr("hash") && $('#' + $(location).attr("hash").slice(1)).length) {
        scrollTo($('#' + $(location).attr("hash").slice(1)));
    }

    // accordion (no panel involved)
    $('.accordion-header').on('click', function() {
        if ($(this).attr('aria-expanded') == 'false') {
            $(this).attr('aria-expanded', 'true');
            $(this).next('.accordion-content').attr('aria-expanded', 'true').slideDown();
        } else {
            $(this).attr('aria-expanded', 'false');
            $(this).next('.accordion-content').attr('aria-expanded', 'false').slideUp();
        }
    });

    // sidebar sticky scrollspy
    if ($('.sidenav').length) {
        $('body').attr('data-spy', 'scroll').attr('data-target', '#sidenav');
        $('.sidenav').parent().stickySidebar({
            topSpacing: 20,
            minWidth: 768,
            resizeSensor: true,
        });
    }
    $(window).on('activate.bs.scrollspy', function(e, obj) {
        if (obj != null && $('.sidenav a[href="' + obj.relatedTarget + '"]').length) {
            var navLink = $('.sidenav a[href="' + obj.relatedTarget + '"]');
            if (navLink.closest('.li-level1').length) {
                var navLinkParent = navLink.closest('.li-level1');
                if (!navLinkParent.hasClass('is-open')) {
                    navLinkParent.children().children('.menu-toggler').click();
                    navLinkParent.children().children('.menu-toggler').addClass('active');
                } else {
                    navLinkParent.children().children('.menu-toggler').removeClass('active');
                }
            }
        }
    });
    $('.sidenav .menu-toggler').on('click', function() {
        if ($(this).hasClass('sgds-icon-chevron-up')) {
            $(this).parent('.li-item').parent().removeClass('is-open');
            $(this).parent().next('ul').slideUp();
            $(this).addClass('sgds-icon-chevron-down').removeClass('sgds-icon-chevron-up');
        } else {
            $(this).parent('.li-item').parent().addClass('is-open');
            $(this).parent().next('ul').slideDown();
            $(this).addClass('sgds-icon-chevron-up').removeClass('sgds-icon-chevron-down');
        }
    });
    $('.sidenav a').on('click', function() {
        var id = $(this).attr('href');
        scrollTo(id);
    });


    // create the list systematically
    $('.statement-list').each(function() {
        var alpha = $(this).data('alpha');
        var num = $(this).data('start');
        $(this).children('li').each(function() {
            $(this).prepend('<span class="list-mark">' + alpha + num.toString() + '. </span>');
            num = num + 1;
        });
    });

    // tooltip
    $('[data-toggle="tooltip"]').tooltip();

});

// var menuWidth = [];
$(window).on('load resize orientationchange', function() {
    $('nav.navbar ul.nav > .navbar-item').each(function() {
        $(this).children('a').css('width', '');
        if ($(window).width() > 1023) {
            var spanwidth = $(this).children('a').children('span').width();
            var liwidth = $(this).children('a').width();
            if (Math.abs(liwidth - spanwidth) > 10) {
                $(this).children('a').width(spanwidth + 10);
            }
        }
    });

    var sidenavWidth = $('.sidenav').closest('div[class*="col-"]').width();
    $('.sidenav').parent().width(sidenavWidth);
    if ($(window).width() > 767) {
        if ($('.quicklinks').length) {
            elemAligner($('.quicklinks'), ['.card_title', '.card_img', '.card_description']);
        }
    } else {
        ['.card_title', '.card_img', '.card_description'].forEach(function(elem) {
            $('.quicklinks').find(elem).height('auto');
        });
    }

    var $videotab = $('.video-selector');
    if ($videotab.length) {
        if ($videotab.find('.tab-item').length >= 5) {
            if (!$videotab.hasClass('slick-initialized')) {
                videoTabSlick($videotab);
            }
        } else if ($videotab.find('.tab-item').length >= 3) {
            if ($(window).width() > 767) {
                if ($videotab.hasClass('slick-initialized')) {
                    $videotab.slick('unslick');
                }
            } else {
                if (!$videotab.hasClass('slick-initialized')) {
                    videoTabSlick($videotab);
                }
            }
        } else {
            if ($(window).width() > 576) {
                if ($videotab.hasClass('slick-initialized')) {
                    $videotab.slick('unslick');
                }
            } else {
                if (!$videotab.hasClass('slick-initialized')) {
                    videoTabSlick($videotab);
                }
            }
        }
    }
}).resize();

// Scroll to top
$(window).on('scroll', function() {
    if ($(document).scrollTop() > 30) {
        $('#scrollToTop').show();
    } else {
        $('#scrollToTop').hide();
    }
});