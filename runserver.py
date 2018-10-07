import os
import bibtexparser
import docupy
import json
import http.server
import socketserver

def trim(s):
    chars = " :-).(}{"
    if s.endswith(".pdf"): s = s[:-4]
    if s.startswith("("): s = s[s.find(")"):]
    for char in chars: s = s.replace(char, "")
    return s.lower()

pdfs = [f for f in os.listdir("Papers") if f.endswith(".pdf")]
trimmed_pdfs = [trim(p) for p in pdfs]
with open("refs.bib") as f:
    bib = bibtexparser.load(f)
refs = [trim(b["title"]) for b in bib.entries]
with open("notes.md") as f:
    notes = f.read()

lines = [l for l in notes.splitlines() if l.strip()]
papers = []
for line in lines:
    if line[:2] == "##":
        papers.append([line])
    else:
        papers[-1].append(line)

papers = [{
 "date": paper[0][4:14],
 "title": docupy.markdown_to_html(paper[0][:3] + paper[0][15:]),
 "summary": docupy.markdown_to_html(paper[1]).replace("<p", "<p class='summary'"),
 "notes": docupy.markdown_to_html("\n\n".join(paper[2:])),
 "pdf": trim(paper[0][3:]) in trimmed_pdfs,
 "bib": trim(paper[0][3:]) in refs,
} for paper in papers]
with open("papers.json", "w") as f:
    json.dump(papers, f)

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
