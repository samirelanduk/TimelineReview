function isTouchDevice() {
    //This function might not always work...
    return "ontouchstart" in window || navigator.msMaxTouchPoints;
}

function selectPaper(id, papers) {
    // Selects a paper by its ID, scrolls to it, makes it appear, etc.
    $(".paper").each(function() {
        $(this).removeClass("visible");
        if ($(this).attr("data-id") == id) {
            $(this).addClass("visible");
            window.location = "#" + papers[parseInt(id)].datestring
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
    // Gets the ID of the currently selected paper, or '-1' if none is selected.
    var id = "-1";
    $(".paper").each(function() {
        if ($(this).hasClass("visible")) {
            id = $(this).attr("data-id");
        }
    });
    return id;
}

var PX_PER_DAY = 0.1;

$.ajax({
    //Get the generated JSON
    url: "papers.json",
    cache: false,
    contentType: "application/json",
    success: function(papers) {
        // Make a JS date for every paper
        for (var p = 0; p < papers.length; p++) {
            papers[p].date = new Date(papers[p].datestring)
        }

        // Work out the limits of the timeline
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

        // Add timeline papers
        var notes = $(".notes");
        var pdfCount = 0;
        var bibCount = 0;
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
            if (papers[p].bib) {bibCount++}
            if (papers[p].pdf) {pdfCount++}
        }

        // Update paper count

        $(".paper-count")[0].innerHTML = papers.length + " Papers"
        $(".papers-summary")[0].innerHTML = "<p>" + pdfCount + " Papers with PDF</p><p>" + bibCount + " Papers with BIB</p>"

        // Make each timeline dot clickable and hoverable.
        $(".timeline-dot").each(function() {
            var id = $(this).attr("data-id");
            $(this).click(function() {
                selectPaper(id, papers);
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

        if (window.location.hash) {
            term = window.location.hash.slice(1);
            for (var p = 0; p < papers.length; p++) {
                if (term == papers[p].datestring) {
                    selectPaper(p, papers);
                }
            }
        }

        // If the links are internal, make them select a paper when clicked.
        $("a").each(function() {
            if ($(this).attr("href")[0] == "#") {
                $(this).on("click", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    for (var p = 0; p < papers.length; p++) {
                        if ($(this).attr("href").slice(1) == papers[p].datestring) {
                            selectPaper(p, papers);
                        }
                    }
                });
            }
        })

        // Let the user use up and down keys to navigate
        $(document).on("keydown", function(e) {
            if (e.which == 40) {
                e.preventDefault();
                e.stopPropagation();
                id = parseInt(getSelectedPaperId()) + 1;
                if (id < $(".paper").length) {
                    selectPaper(id, papers);
                }
            }
            if (e.which == 38) {
                e.preventDefault();
                e.stopPropagation();
                id = parseInt(getSelectedPaperId()) - 1;
                if (id >= 0) {
                    selectPaper(id, papers);
                }
            }
        });

        // Make summary pop up when clicked
        $(".paper-count").click(function() {
            $(".papers-summary").slideToggle("fast")
        })
    }
});
