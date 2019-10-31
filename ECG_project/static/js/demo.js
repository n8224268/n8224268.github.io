$(document).ready(init);

function init() {

    /* ========== DRAWING THE PATH AND INITIATING THE PLUGIN ============= */
    $.fn.scrollPath("getPath")
        .moveTo(0, 0, {
            name: "section-1",
            callback: function() {
                navStyle("section-1");
                if ($(".heart_core").hasClass("hide")) {
                    $(".heart_core").removeClass("hide");
                }
                if ($(".heart_core_small").hasClass("show")) {
                    $(".heart_core_small").removeClass("show");
                }
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
        .lineTo(0, 220, {
            callback: function() {
                if ($(".heart_core_small").hasClass("show")) {
                    $(".heart_core_small").removeClass("show");
                }
            }
        })
        .lineTo(0, 250, {
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
        .lineTo(126, 4360, {
            callback: function() {
                if (!$(".heart_core_small").hasClass("show")) {
                    $(".heart_core_small").addClass("show");
                }
            }
        })
        .lineTo(126, 4560, {
            callback: function() {
                if ($(".heart_core_small").hasClass("show")) {
                    $(".heart_core_small").removeClass("show");
                }
            }
        })
        .lineTo(126, 5600, {
            name: "section-11",
            callback: function() {
                navStyle("section-11");
                if ($(".heart_core_small").hasClass("show")) {
                    $(".heart_core_small").removeClass("show");
                }
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
            $("nav").find("a").removeClass("active");
            $(this).addClass("active");
            if (!$(".heart_core").hasClass("hide")) {
                $(".heart_core").addClass("hide");
            }
            if (!$(".heart_core_small").hasClass("show")) {
                $(".heart_core_small").addClass("show");
            }

            e.preventDefault();

            // Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
            // for extra easing functions like the one below
            $.fn.scrollPath("scrollTo", target, 800, "easeInOutSine");
        });
    });
    $("nav li:last-child a").click(function(e) {
        if ($(".heart_core_small").hasClass("show")) {
            $(".heart_core_small").removeClass("show");
        }
    })
    $(".js-gotoInteraction").each(function() {
        var target = $(this).attr("href").replace("#", "");
        $(this).click(function(e) {
            $("nav").find("a").removeClass("active");
            $(this).addClass("active");
            if ($(".heart_core_small").hasClass("show")) {
                $(".heart_core_small").removeClass("show");
            }

            e.preventDefault();

            // Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
            // for extra easing functions like the one below
            $.fn.scrollPath("scrollTo", target, 400, "easeInOutSine");
        });
    });


    /* Show path ===================================================================== */
    $(".settings .show-path").click(function(e) {
            e.preventDefault();
            $(".sp-canvas").toggle();
        })
        // .toggle(function() {
        // 	$(this).text("Hide Path");
        // }, function() {
        // 	$(this).text("Show Path");
        // });


    /* Heartbeat Interaction =============================================================================== */
    var M_Status = 'ready' // ready, recording, finished
    var counter = -1;
    var SpecPrepared = false;
    $heartbeatRecordBtn = $('.js-heartbeatRecord');
    $spectrogramLoading = $('.section-11 .spectrogram .loading');
    $graphOutter = $('.section-11 .graph-outter');
    $spectrogram = $('.section-11 .spectrogram');
    setInterval(function() {
        if (M_Status == 'ready') {
            counter = -1;
            $heartbeatRecordBtn.text('心律波形錄製');
            $spectrogramLoading.text('準備錄製');
            $('.spectrogram__inner').css("background-image", "url()");
            if ($('.spectrogram__inner').hasClass('active')) {
                $('.spectrogram__inner').removeClass('active');
            }
        } else if (M_Status == 'recording') {
            $heartbeatRecordBtn.text('停止');
            $spectrogramLoading.text('錄製中...' + counter)
            if (counter == 10) {
                M_Status = 'finished';
                $spectrogramLoading.text('錄製完畢');
                $heartbeatRecordBtn.text('重設');
                setTimeout(function() {
                    $spectrogramLoading.text('');
                }, 400);

                // post request for save data as json file
                $.post('http://localhost:3000/posts/?getSpec=true');

                // Print out spectrogram
                setTimeout(function() {
                    $('.spectrogram__inner').css("background-image", "url(static/images/heart_data.png)").addClass('active');
                }, 100);
            }
        } else if (M_Status == 'finished') {
            counter = -2;
        }
        console.log(M_Status, counter)
        counter++;
    }, 1000)

    $heartbeatRecordBtn.click(function(e) {
        $(this).addClass('is-onclick');
        if (M_Status == 'ready') {
            M_Status = 'recording';
            if (!$graphOutter.hasClass('is-squeeze')) {
                $graphOutter.addClass('is-squeeze');
            }
            if (!$spectrogram.hasClass('is-loading')) {
                $spectrogram.addClass('is-loading');
            }
        } else if (M_Status == 'recording' && counter < 10) {
            M_Status = 'ready';
            if ($graphOutter.hasClass('is-squeeze')) {
                $graphOutter.removeClass('is-squeeze');
            }
            if ($spectrogram.hasClass('is-loading')) {
                $spectrogram.removeClass('is-loading');
            }
        } else if (M_Status == 'finished') {
            M_Status = 'ready';
            if ($graphOutter.hasClass('is-squeeze')) {
                $graphOutter.removeClass('is-squeeze');
            }
            if ($spectrogram.hasClass('is-loading')) {
                $spectrogram.removeClass('is-loading');
            }
        }
        e.preventDefault();
    });

    // Antibouncer for btn
    setInterval(function() {
        if ($heartbeatRecordBtn.hasClass('is-onclick')) {
            $heartbeatRecordBtn.removeClass('is-onclick');
        };
    }, 1000)


    /* Heartbeat rate calculation =============================================================================== */
    var heartbeatArr = [];
    var heartbeatArrAvg = 0;
    var heartbeatArrSum = 0;
    var threshold = 2.5;
    var pastTime = new Date().getTime();
    var outputHeartrate = 0;
    socket.on('heartbeat', function(realbeat) {
        if (heartbeatArr.length < 500) {
            heartbeatArr.push(realbeat);
        }
        if (heartbeatArr.length == 500) {
            heartbeatArr.shift();
            heartbeatArr.push(realbeat);

            for (var i = 0; i <= 499; i++) {
                heartbeatArrSum = heartbeatArrSum + parseInt(heartbeatArr[i]);
            }
            heartbeatArrAvg = heartbeatArrSum / 500;

            // over threshold then time it.
            if (heartbeatArr[0] >= heartbeatArrAvg + threshold) {
                var timeChangeArr = [];
                var currentTime = new Date().getTime();
                var timeChange = currentTime - pastTime;
                if (timeChange > 550 && timeChange < 1200) {
                    // Output heartrate
                    outputHeartrate = parseInt(60 / (timeChange / 1000));
                    // console.log(outputHeartrate)
                    $('.heartbeat-bpm .value').text(outputHeartrate);
                }
                pastTime = currentTime;
            }
            heartbeatArrSum = 0;
        }
    });
}


// function download(data, filename, type) {
//     var file = new Blob([data], {
//         type: type
//     });
//     if (window.navigator.msSaveOrOpenBlob) // IE10+
//         window.navigator.msSaveOrOpenBlob(file, filename);
//     else { // Others
//         var a = document.createElement("a"),
//             url = URL.createObjectURL(file);
//         a.href = url;
//         a.download = filename;
//         document.body.appendChild(a);
//         a.click();
//         setTimeout(function() {
//             document.body.removeChild(a);
//             window.URL.revokeObjectURL(url);
//         }, 0);
//     }
// }

// function loadJsonData() {
//     $.getJSON('../../../../data.json', gotData);
//     console.log('got it');
// }

// function gotData(data) {
//     console.log(data);
// }
// loadJsonData();




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



// rellax for this case (old) =====================================================
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