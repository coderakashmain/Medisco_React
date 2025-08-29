/**
Core script to handle the entire theme and core functions
**/
var Madula = (function () {
  "use strict";

  var screenWidth = $(window).width();

  var handleMobileNav = function () {
    $(".mobile-nav .menu-item-has-children").on("click", function (event) {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $(".mobile-nav .menu-item-has-children").removeClass("active");
        $(this).addClass("active");
      }
      event.stopPropagation();
    });

    $("#mobile-menu").click(function () {
      $(this).toggleClass("open");
      $("#mobile-nav").toggleClass("open");
    });

    $("#desktop-menu").click(function () {
      $(this).toggleClass("open");
      $(".desktop-menu").toggleClass("open");
    });

    $("#res-cross").click(function () {
      $("#mobile-nav").removeClass("open");
      $("#mobile-menu").removeClass("open");
    });
  };

  var handleSearchBox = function () {
    if (jQuery(".search-box-outer").length) {
      jQuery(".search-box-outer").on("click", function () {
        jQuery("body").addClass("search-active");
      });
      jQuery(".close-search").on("click", function () {
        jQuery("body").removeClass("search-active");
      });
    }
  };

  var handleAccordionItem = function () {
    $(".accordion-item .heading").on("click", function (e) {
      e.preventDefault();

      if ($(this).closest(".accordion-item").hasClass("active")) {
        $(".accordion-item").removeClass("active");
      } else {
        $(".accordion-item").removeClass("active");

        $(this).closest(".accordion-item").addClass("active");
      }
      var $content = $(this).next();
      $content.slideToggle(100);
      $(".accordion-item .content").not($content).slideUp("fast");
    });
  };

  /* Header Fixed ============ */
  var headerFix = function () {
    /* Main navigation fixed on top  when scroll down function custom */
    jQuery(window).bind("scroll", function () {
      if (jQuery(".sticky-header").length) {
        var menu = jQuery(".sticky-header");
        if ($(window).scrollTop() > menu.offset().top) {
          menu.addClass("is-fixed");
        } else {
          menu.removeClass("is-fixed");
        }
      }
    });
    /* Main navigation fixed on top  when scroll down function custom end*/
  };

  var setCurrentYear = function () {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let elements = document.getElementsByClassName("current-year");

    for (const element of elements) {
      element.innerHTML = currentYear;
    }
  };

  var handleLightGallery = function () {
    if (jQuery("#lightgallery").length > 0) {
      lightGallery(document.getElementById("lightgallery"), {
        plugins: [lgThumbnail, lgZoom],
        selector: ".lg-item",
        thumbnail: true,
        exThumbImage: "data-src",
      });
    }
  };

  var handleProgressBar = function () {
    if ($(".progress-bar").length) {
      $(window).on("scroll", function () {
        let scroll = $(window).scrollTop();
        let oTop = $(".progress-bar").offset().top - window.innerHeight;
        if (scroll > oTop) {
          $(".progress-bar").addClass("progressbar-active");
        }
      });
    }
  };

  var handleScrollTop = function () {
    const scrollPercentage = () => {
      const scrollTopPos = document.documentElement.scrollTop;
      const calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
      const scrollElementWrap = $("#scroll-percentage");

      scrollElementWrap.css(
        "background",
        `conic-gradient( #5454FF ${scrollValue}%, #fff ${scrollValue}%)`
      );

      // ScrollProgress
      if (scrollTopPos > 100) {
        scrollElementWrap.addClass("active");
      } else {
        scrollElementWrap.removeClass("active");
      }

      if (scrollValue < 99) {
        $("#scroll-percentage-value").text(`${scrollValue}%`);
      } else {
        $("#scroll-percentage-value").html(
          '<i class="fa-solid fa-arrow-up-long"></i>'
        );
      }
    };
    window.onscroll = scrollPercentage;
    window.onload = scrollPercentage;
    // Back to Top
    function scrollToTop() {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    $("#scroll-percentage").on("click", scrollToTop);
  };

  var handleProgress = function () {
    var speed = 30;
    var items = $(".progress_bar").find(".progress_bar_item");

    items.each(function () {
      var item = $(this).find(".progress");
      var itemValue = item.data("progress");
      var i = 0;
      var value = $(this);

      var count = setInterval(function () {
        if (i <= itemValue) {
          var iStr = i.toString();
          item.css({
            width: iStr + "%",
          });
          value.find(".item_value").html(iStr + "%");
        } else {
          clearInterval(count);
        }
        i++;
      }, speed);
    });
  };

 


  const serviceList = [
    "Hospitals",
    "Diagnosis Centers / Pathologies",
    "Ayurvedic Centers",
    "Medical Stores",
    "Wellness Centers",
    "SPA",
    "Yoga Centers",
    "Rehabilitation Centers",
    "GYM",
  ];

  serviceList.forEach((service) => {
    const serviceDropdown = document.querySelector(".service-dropdown-box ul");
    const serviceSelect = document.getElementById("service-list");
    const serviceItem = document.createElement("li");
    serviceItem.className =
      "px-15 py-7 ext-black  hover:bg-primary hover:text-white cursor-pointer";
    serviceItem.textContent = service;
    serviceDropdown.appendChild(serviceItem);
    serviceSelect.innerHTML += `<option class="py-7 px-10 bg-[#F4F4FF] text-sm" value="${service}">${service}</option>`;
  });

  var serVicesDropdown = function (e) {
    e.stopPropagation();
    $(".service-dropdown-box").toggleClass("dropdown-active");
  };

  $(document).on("click", ".service-dropdown-out-box ", serVicesDropdown);

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".service-dropdown-out-box").length) {
      $(".service-dropdown-box").removeClass("dropdown-active");
    }
  });


  
  var handleAnimateElements = function () {
    $(window).on("scroll", function () {
      $(".progressbar").each(function () {
        var elementPos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        var percent = $(this).find(".circle").attr("data-percent");
        var percentage = parseInt(percent, 10) / parseInt(100, 10);
        var animate = $(this).data("animate");
        if (elementPos < topOfWindow + $(window).height() - 10 && !animate) {
          $(this).data("animate", true);
          $(this)
            .find(".circle")
            .circleProgress({
              startAngle: -Math.PI / 2,
              value: percent / 100,
              size: 150,
              thickness: 8,
              emptyFill: "#5454FF10",
              fill: {
                color: "#5454FF",
              },
            })
            .on(
              "circle-animation-progress",
              function (event, progress, stepValue) {
                $(this)
                  .find("div")
                  .text((stepValue * 100).toFixed() + "%");
              }
            )
            .stop();
        }
      });
    });
  };

  var handleAnimate = function () {
    function inVisible(element) {
      var WindowTop = $(window).scrollTop();
      var WindowBottom = WindowTop + $(window).height();
      var ElementTop = element.offset().top;
      var ElementBottom = ElementTop + element.height();
      if (ElementBottom <= WindowBottom && ElementTop >= WindowTop)
        animate(element);
    }

    function animate(element) {
      if (!element.hasClass("ms-animated")) {
        var maxval = element.data("max");
        var html = element.html();
        element.addClass("ms-animated");
        $({
          countNum: element.html(),
        }).animate(
          {
            countNum: maxval,
          },
          {
            duration: 5000,
            easing: "linear",
            step: function () {
              element.html(Math.floor(this.countNum) + html);
            },
            complete: function () {
              element.html(this.countNum + html);
            },
          }
        );
      }
    }
    $(window).scroll(function () {
      $("h2[data-max]").each(function () {
        inVisible($(this));
      });
    });
  };

  var handlelightbox = function () {
    var boxWidth = $("#lightbox").width();
    $(".white_content").animate({
      opacity: 0,
      width: 0,
      left: -10000,
    });
    $("#close").on("click", function () {
      $(".white_content").animate({
        opacity: 0,
        width: 0,
        left: -1000,
      });
    });
    $("#show").on("click", function () {
      $(".white_content").animate({
        opacity: 1,
        width: 500,
        left: 0,
      });
      $("#overlay").animate({
        opacity: 1,
        width: boxWidth,
        left: 0,
      });
    });
  };

  var HandleNiceSelect = function () {
    if (jQuery(".nice-select").length > 0) {
      $(".nice-select").niceSelect();
    }
  };

  var handleSupport = function () {
    var support =
      '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global.js"></script>';
    jQuery("body").append(support);
  };

  /* Function ============ */
  return {
    init: function () {
      handleMobileNav();
      handleSearchBox();
      handleAccordionItem();
      headerFix();
      setCurrentYear();
      handleLightGallery();
      handleProgressBar();
      handleScrollTop();
      handleProgress();
      handleAnimateElements();
      handleAnimate();
      handlelightbox();
      HandleNiceSelect();
      // showDropdown();
      //handleSupport();
    },

    load: function () {},

    resize: function () {},
  };
})();

/* Document.ready Start */
jQuery(document).ready(function () {
  Madula.init();

  //jQuery('#loading-area').find('div').addClass('la-animate');
  $(".dez-page").on("click", function () {
    if ($(this).attr("href") != "#" || $(this).attr("href") != "") {
      jQuery("#loading-area").find("div").addClass("la-animate");
    }
  });

  $('a[data-bs-toggle="tab"]').click(function () {
    // todo remove snippet on bootstrap v4
    $('a[data-bs-toggle="tab"]').click(function () {
      $($(this).attr("href")).show().addClass("show active").siblings().hide();
    });
  });

  jQuery(".navicon").on("click", function () {
    $(this).toggleClass("open");
    $(".Navigationbar").toggleClass("active");
    $(this).toggleClass("active");
  });
});
/* Document.ready END */

/* Window Load START */
jQuery(window).on("load", function (e) {
  Madula.load();
  setTimeout(function () {
    jQuery("#loading-area").remove();
  }, 300);
});
/*  Window Load END */
/* Window Resize START */
jQuery(window).on("resize", function () {
  Madula.resize();
});
/*  Window Resize END */
