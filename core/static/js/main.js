var scroll = new SmoothScroll('a[href*="#"]', {updateURL: false});

var paper = 0;

function onScroll() {
    var position = window.pageYOffset;
    var papers = document.getElementsByClassName("paper");
    for (var p = 0; p < papers.length; p++) {
        if (papers[p].offsetTop + papers[p].getBoundingClientRect().height > position) {
            paper = p;
            break
        }
    }
}
window.addEventListener("scroll", onScroll);

document.onkeydown = function(event) {
    var papers;
    if (paper != 0 && event.keyCode == 38 || event.keyCode == 40) {
        event.preventDefault();
        papers = document.getElementsByClassName("paper");
    }

    if (event.keyCode == 38) {
        if (paper > 0) {
            scroll.animateScroll(papers[paper - 1]);
        }
    } else if (event.keyCode == 40) {
        scroll.animateScroll(papers[paper + 1]);

    }
};