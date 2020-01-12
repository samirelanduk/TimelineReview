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

var button = document.getElementsByClassName("reorder-button");
if (button.length) {
    button = button[0];
    button.onclick = function() {
        var papers = document.getElementsByClassName("papers")[0];
        if (papers.classList.contains("reversed")) {
            papers.classList.remove("reversed");
        } else {
            papers.classList.add("reversed");
        }

    }
}

button = document.getElementsByClassName("delete-button");
if (button.length) {
    button = button[0];
    button.onclick = function() {
        var deleteSection = document.getElementsByClassName("delete-section")[0];
        deleteSection.style.display = "block";
    }

    var changedMind = document.getElementsByClassName("changed-mind")[0];
    changedMind.onclick = function() {
        var deleteSection = document.getElementsByClassName("delete-section")[0];
        deleteSection.style.display = null;
    }
}

bibs = document.getElementsByClassName("bibtex");
for (var bib of bibs) {
    bib.addEventListener("click", (e) => {
        let bib = e.target.parentNode.parentNode.getElementsByClassName("full-bib")[0];
        bib.classList.toggle("hidden");
    })
}