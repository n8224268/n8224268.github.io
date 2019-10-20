$(document).ready(init);

function init() {
    /* ========== DRAWING THE PATH AND INITIATING THE PLUGIN ============= */

    $.fn.scrollPath("getPath")
        .moveTo(0, 0, {
            name: "section-1",
            callback: function() {
                navStyle("section-1");
            }
        })
        .lineTo(0, 90, {
            callback: function() {
                if ($(".heart_core").hasClass("hide")) {
                    $(".heart_core").removeClass("hide");
                }
            }
        })
        .lineTo(0, 120, {
            callback: function() {
                if (!$(".heart_core").hasClass("hide")) {
                    $(".heart_core").addClass("hide");
                }
            }
        })
        .lineTo(0, 200, {
            callback: function() {
                if ($(".heart_core_small").hasClass("show")) {
                    $(".heart_core_small").removeClass("show");
                }
            }
        })
        .lineTo(0, 230, {
            callback: function() {
                if (!$(".heart_core_small").hasClass("show")) {
                    $(".heart_core_small").addClass("show");
                }
            }
        })
        .lineTo(0, 540)
        .arc(810, 540, 810, Math.PI, Math.PI * 0.81, true, {
            name: "section-2",
            callback: function() {
                navStyle("section-2");
            }
        })
        .arc(810, 540, 810, Math.PI * 0.81, Math.PI / 1.6, true)
        .lineTo(800, 1400, {
            name: "section-3",
            callback: function() {
                navStyle("section-3");
            }
        })
        .arc(1240, -164, 1624, Math.PI / 1.7, Math.PI / 2.4, true)
        .lineTo(1950, 1320, {
            name: "section-4",
            callback: function() {
                navStyle("section-4");
            }
        })
        .lineTo(2120, 1260)
        .arc(2476, 1780, 600, Math.PI * 1.4, Math.PI * 1.75, false, {
            name: "section-5",
            callback: function() {
                navStyle("section-5");
            }
        })
        .arc(2476, 1780, 600, Math.PI * 1.75, Math.PI * 2.25, false, {
            name: "section-6",
            callback: function() {
                navStyle("section-6");
            }
        })
        .arc(1750, 1060, 1624, Math.PI * 2.25, Math.PI * 0.375, false, {
            name: "section-7",
            callback: function() {
                navStyle("section-7");
            }
        })
        .arc(1750, 1060, 1624, Math.PI * 0.375, Math.PI / 2, false)
        .arc(1750, 4310, 1624, Math.PI * 1.5, Math.PI * 1.333, true, {
            name: "section-8",
            callback: function() {
                navStyle("section-8");
            }
        })
        .arc(1750, 4310, 1624, Math.PI * 1.333, Math.PI * 1.1667, true, {
            name: "section-9",
            callback: function() {
                navStyle("section-9");
            }
        })
        .arc(1750, 4310, 1624, Math.PI * 1.1667, Math.PI, true, {
            name: "section-10",
            callback: function() {
                navStyle("section-10");
            }
        })

    // callback: function() {
    //     highlight($(".sp-scroll-handle"));
    // },

    // We're done with the path, let's initate the plugin on our wrapper element
    $(".wrapper").scrollPath({
        drawPath: true,
        // wrapAround: false, // for loop
        // scrollBar: false
    });

    // Add scrollTo on click on the navigation anchors
    $("nav").find("a").each(function() {
        var target = $(this).attr("href").replace("#", "");
        $(this).click(function(e) {
            $("nav").find("a").removeClass("active")
            $(this).addClass("active")
            e.preventDefault();

            // Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
            // for extra easing functions like the one below
            $.fn.scrollPath("scrollTo", target, 800, "easeInOutSine");
        });
    });

    /* ===================================================================== */

    $(".settings .show-path").click(function(e) {
            e.preventDefault();
            $(".sp-canvas").toggle();
        })
        // .toggle(function() {
        // 	$(this).text("Hide Path");
        // }, function() {
        // 	$(this).text("Show Path");
        // });
}


function highlight(element) {
    if (!element.hasClass("highlight")) {
        element.addClass("highlight");
        setTimeout(function() {
            element.removeClass("highlight");
        }, 2000);
    }
}

function navStyle(name) {
    $(".nav a").each(function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
    })
    $('.nav a[href="#' + name + '"]').addClass("active")
}

// get wrapper changing
// (function() {
//     var ev = new $.Event('style'),
//         orig = $.fn.css;
//     $.fn.css = function() {
//         $(this).trigger(ev);
//         return orig.apply(this, arguments);
//     }
// })();


// var wrapperTopPast = 0;
// var wrapperLeftPast = 0;
// var wrapperTopMove = 0;
// var wrapperLeftMove = 0;

// $('.wrapper').bind('style', function(e) {
//     wrapperTop = $(this).position().top;
//     wrapperLeft = $(this).position().left;

//     // Calculate scroll Movement
//     wrapperTopMove = wrapperTop - wrapperTopPast;
//     wrapperTopPast = wrapperTop;
//     wrapperLeftMove = wrapperLeft - wrapperLeftPast;
//     wrapperLeftPast = wrapperLeft;
//     console.log('Movement:', wrapperTopMove, wrapperLeftMove);


// });

// var rellaxSpeed_x = 0;
// var rellaxSpeed_y = 0;

// setInterval(function() {
//     // Update rellax
//     rellax_x = $('.rellax').position().left + rellaxSpeed_x;
//     rellax_y = $('.rellax').position().top + rellaxSpeed_y;
//     $('.rellax').css({
//         'left': rellax_x,
//         'top': rellax_y
//     });

//     // Calculate speed
//     speedRatio = $('.rellax').data('rellax-speed'); // 1 to 5
//     rellaxSpeed_x = wrapperLeftMove * (speedRatio / 5);
//     rellaxSpeed_y = wrapperTopMove * (speedRatio / 5);
//     // console.log('rellax speed: ', rellaxSpeed_x, rellaxSpeed_y);
// }, 100);