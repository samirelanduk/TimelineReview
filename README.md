# TimelineReview

This tool can be used to make an interactive timeline of (for example) scientific
papers when doing a literature review, or something similar. An example would
be [this one](https://zincreview.samireland.com/).

## How do I do this?

1. Clone this repo to your local computer, and `cd` into that directory.
2. Install the necessary Python libraries with `$ pip3 install bibtexparser docupy`. You may need to use `sudo` if installing to your regular python installation and not a virtual environment.
3. Drag any papers you want to make notes on into the Papers folder. These should be PDFs, and their filenames should be of the form ''(YYYY-MM) *title-of-paper*.pdf'.
4. Create a file called `notes.md` and a file called `refs.bib`. These will hold markdown notes and BibTex references respectively.
5. Running `$ python3 pdfs_no_notes.py` at this point (or indeed at any point) will tell you how many papers you have saved, and how many of them have no notes associated with them. At this point that will be all of them.
6. Make some notes for one of the papers. Open `notes.md` and write notes using the following format (ignoring empty lines, which are ignored):
   1. The first line must have the form ## (YYYY-MM-DD) *Title of Paper*. If you don't know the exact day then make something up but note that **every paper must have a unique date** - if you have two papers with the same date just change one by one day (not ideal I know but that's how it works). The title must be the same as the title in the .pdf name, aside from punctuation and whitespace.
   2. The second line should be a summary of what the paper found - ideally one sentence.
   3. The next lines are optional, but you can write as much or as little as you want about the paper.
7. Run `$ python3 generate.py`. This will create a .json file.
8. Start a simple web server using `$ python3 -m http.server 8080` and go to http://127.0.0.1 in your browser. You should see a timeline on the left, with your one paper, and when you click it, the notes should appear on the right.
9. Each paper will indicate whether it has a .pdf associated and a .bib entry. I add a .bib entry to the refs.bib file once I'm done making notes, so that it can double as a 'this paper has been fully processed' marker.
10. Repeat as required for other papers. 
