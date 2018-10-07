function isTouchDevice() {
    return "ontouchstart" in window || navigator.msMaxTouchPoints;
}

function selectPaper(id) {
    $(".paper").each(function() {
        $(this).removeClass("visible");
        if ($(this).attr("data-id") == id) {
            $(this).addClass("visible");
        }
    })
    $(".timeline-dot").each(function() {
        $(this).removeClass("selected");
        if ($(this).attr("data-id") == id) {
            $(this).addClass("selected");
            offset = $(this).css("top").slice(0, $(this).css("top").length - 2) - 20;
            $(".timeline-container").animate({
                scrollTop: offset
            }, 500)
        }
    });
}

function getSelectedPaperId() {
    var id = "-1";
    $(".paper").each(function() {
        if ($(this).hasClass("visible")) {
            id = $(this).attr("data-id");
        }
    });
    return id;
}

var PX_PER_DAY = 0.2;

$.ajax({
    url: "papers.json",
    cache: false,
    contentType: "*/*",
    success: function(papers){
        for (var p = 0; p < papers.length; p++) {
            papers[p].date = new Date(papers[p].datestring)
        }
        var start = new Date(papers[0].date.getYear() + 1900, 0, 1);
        var end = new Date(new Date().getYear() + 1900, 11, 31);
        var totalDays = (end - start) / (1000 * 60 * 60 * 24)
        $(".timeline").css("height", (totalDays * PX_PER_DAY) + "px");

        // Add timeline labels
        var timeline = $(".timeline");
        var year = start;

        while (year < end) {
            yearMid = new Date(year.getYear() + 1900, 7, 1);
            days = (year - start) / (1000 * 60 * 60 * 24)
            timeline.append("<div class='year-line' style='top:"
             + (days * PX_PER_DAY)
              + "px;'></div>");
            days = (yearMid - start) / (1000 * 60 * 60 * 24)
            timeline.append("<div class='year-label' style='top:"
             + (days * PX_PER_DAY)
             + "px;'>" + (1900 + year.getYear()) + "</div>");
            year = new Date(year.getYear() + 1901, 0, 1);
        }


        var notes = $(".notes");
        for (var p = 0; p < papers.length; p++) {
            var days = (papers[p].date - start) / (1000 * 60 * 60 * 24)
            timeline.append("<div class='timeline-dot' style='top:"
            + (days * PX_PER_DAY)
            + "px' data-id='" + p + "'></div>");
            timeline.append("<div class='timeline-box'>" + papers[p].title
            + papers[p].summary + "</div>")
            notes.append("<div class='paper' data-id='" + p + "'>" +
            "<div class='date'>" + papers[p].date.toLocaleDateString("GB", {
                year: 'numeric', month: 'short', day: 'numeric'
            }) + "<div class='pdf " + papers[p].pdf
            + "'>PDF</div><div class='bib " + papers[p].bib
            + "'>BIB</div></div><div>" + papers[p].title + papers[p].summary
            + papers[p].notes + "</div></div>")
        }



        $(".timeline-dot").each(function() {
            var id = $(this).attr("data-id");
            $(this).click(function() {
                selectPaper(id);
            })

            if (!isTouchDevice()) {
                $(this).on("mouseenter", function(e) {
                    var box = $($(this)[0].nextElementSibling);
                    offset = $(this).position().top
                    offset = offset > 20 ? offset - 20 : offset
                    box.css("top", offset+ "px");
                    box.addClass("visible")
                })
                $(this).on("mouseleave click", function(e) {
                    $($(this)[0].nextElementSibling).removeClass("visible")
                })
            }

        })

        $("a").each(function() {
            if ($(this).attr("href")[0] == "#") {
                $(this).on("click", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    for (var p = 0; p < papers.length; p++) {
                        if ($(this).attr("href").slice(1) == papers[p].datestring) {
                            selectPaper(p);
                        }
                    }
                });
            }
        })

        $(document).on("keydown", function(e) {
            if (e.which == 40) {
                e.preventDefault();
                e.stopPropagation();
                id = parseInt(getSelectedPaperId()) + 1;
                if (id < $(".paper").length) {
                    selectPaper(id);
                }
            }
            if (e.which == 38) {
                e.preventDefault();
                e.stopPropagation();
                id = parseInt(getSelectedPaperId()) - 1;
                if (id >= 0) {
                    selectPaper(id);
                }
            }
        });
    }
});
