$(".bar-container").click(function() {
    $(this).toggleClass("change");
    $('.sidenav').toggleClass("sidenav-toggle");
    $('.container').toggleClass("container-toggle");
});

var totalHeight = 0,
    dropDownHeight = $(".dropdown-menu").outerHeight();

$(".dropdown-menu").children().each(function() {
    totalHeight = totalHeight + $(this).outerHeight(true);
});
$('.trig').click(function() {
    if (dropDownHeight == 0) {
        $('.dropdown-menu').css("height", totalHeight + "px");
        dropDownHeight = totalHeight;

    } else {
        $('.dropdown-menu').css("height", "0");
        dropDownHeight = 0;
    }
});

// PARALLAX
//helper function
function setParallax(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
}

window.addEventListener("scroll", function() {
    var scrolledHeight = window.pageYOffset;
    setParallax(".parallax").forEach(function(el, index, array) {
        var limit = el.offsetTop + el.offsetHeight;
        if (scrolledHeight > el.offsetTop && scrolledHeight <= limit) {
            el.style.backgroundPositionY = (scrolledHeight - el.offsetTop) / 1.5 + "px";

        } else {
            el.style.backgroundPositionY = "0";
        }
    });
});


/* Nav Bar */


(function($) {

    // DOM Ready Function
    $(function() {
        Carousel.init();
    });

    Carousel = {
        init: function() {
            // Common jQuery Elements
            this.$container = $('.carousel');
            this.$triggerNext = this.$container.find('.js-carousel-nav_next');
            this.$triggerPrev = this.$container.find('.js-carousel-nav_prev');
            this.$carousel = $('.carousel-list');
            this.$carouselListItem = this.$carousel.find('li');
            this.$carouselListItemFirst = this.$carousel.find('li:first');
            this.$carouselListItemLast = this.$carousel.find('li:last');
            this.$carouselItem = $('.carousel-item');
            this.$selectedItem = this.$carousel.find('.carousel-item_isSelected');

            // Common Markers/Placeholders
            this.marker = this.$selectedItem.index();
            this.paddedMarker = this.$selectedItem.index() + 1;
            this.viewportWidth = this.$carouselItem.width();
            this.carouselItemLength = this.$carouselItem.length;
            this.theEnd = this.carouselItemLength - 1;

            // Initiate Functions
            this.bulletNav();
            this.bindEvents();
            //this.autoPlay();
        },

        bindEvents: function() {
            var self = this;
            var $triggerBullet = this.$container.find('.js-carousel-bulletNav-control');
            //var indexBullet = $triggerBullet.index();

            this.$triggerNext.on('click', function(e) {
                e.preventDefault();
                self.nextSlide();
            });

            this.$triggerPrev.on('click', function(e) {
                e.preventDefault();
                self.prevSlide();
            });

            $triggerBullet.on('click', function(e, i) {
                var $this = $(this);
                var i = $this.index();

                e.preventDefault();
                self.bulletNavControl(i);
            });
        },

        //Return the value to slide container by
        slideBy: function() {
            var slideBy = (this.viewportWidth * -this.marker) + 'px';

            return slideBy;
        },

        updateMarkerNext: function() {
            var $currentActive = this.$carousel.find('.carousel-item_isSelected');

            $currentActive.removeClass('carousel-item_isSelected');
            $currentActive.next().addClass('carousel-item_isSelected');
        },

        updateMarkerPrev: function() {
            var $currentActive = this.$carousel.find('.carousel-item_isSelected');

            $currentActive.removeClass('carousel-item_isSelected');
            $currentActive.prev().addClass('carousel-item_isSelected');
        },

        updateMarkerToFirst: function() {
            this.$carouselListItemLast.removeClass('carousel-item_isSelected');
            this.$carouselListItemFirst.addClass('carousel-item_isSelected');
        },

        updateMarkerToLast: function() {
            this.$carouselListItemFirst.removeClass('carousel-item_isSelected');
            this.$carouselListItemLast.addClass('carousel-item_isSelected');
        },

        incrementSlide: function() {
            if (this.marker < this.carouselItemLength) {
                this.marker++;
            } else {
                this.marker = 1;
            }
        },

        decrementSlide: function() {
            if (this.marker == 0 ) {
                this.marker = this.theEnd;
            } else {
                this.marker--;
            }
        },

        // Go to next slide
        nextSlide: function() {
            this.incrementSlide();

            if (this.marker < this.carouselItemLength) {
                this.updateMarkerNext();
                this.$carousel.css('margin-left', this.slideBy());
            } else {
                this.updateMarkerToFirst();
                this.$carousel.css('margin-left', 0);
            }
        },

        // Go to previous slide
        prevSlide: function() {
            this.decrementSlide();

            if (this.marker == this.theEnd) {
                this.updateMarkerToLast();
                this.$carousel.css('margin-left', this.slideBy());
            } else {
                this.updateMarkerPrev();
                this.$carousel.css('margin-left', this.slideBy());
            }
            
        },

        bulletNav: function() {
            var $bulletNav = $('.carousel-bulletNav');

            for(i = 0; i < this.carouselItemLength; i++) {
                $bulletNav.append('<li class="carousel-bulletNav-control js-carousel-bulletNav-control"><a></a></li>');
            }
        },

        updateMarkerBullet: function(index) {
            var $currentActive = this.$carousel.find('.carousel-item_isSelected');

            $currentActive.removeClass('carousel-item_isSelected');
            this.$carouselItem.eq(index).addClass('carousel-item_isSelected');
        },

        bulletNavControl: function(index) {
            var slideByBullet = (this.viewportWidth * -index) + 'px';

            this.$carousel.css('margin-left', slideByBullet);
            this.updateMarkerBullet(index);
            this.marker = index;
        }
    }
}(jQuery));

var username = "creindle";
var hostname = "gmail.com";
var linktext = username + "@" + hostname ;
document.getElementById('email').innerHTML = ("<a href='" + "mail" + "to:" + username + "@" + hostname + "'>" + linktext + "</a>");

// Sticky Header
$(window).scroll(function() {

    if ($(window).scrollTop() > 100) {
        $('.main_h').addClass('sticky');
    } else {
        $('.main_h').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.main_h').removeClass('open-nav');
    } else {
        $('.main_h').addClass('open-nav');
    }
});

$('.main_h li a').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_h').removeClass('open-nav');
    }
});

// navigation scroll lijepo radi materem
$('nav a').click(function(event) {
    var id = $(this).attr("href");
    var offset = 70;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
        scrollTop: target
    }, 500);
    event.preventDefault();
});




