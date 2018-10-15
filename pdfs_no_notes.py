import os

def trim(s):
    """Takes a title and strips it down to just alphanumeric characters."""
    chars = " :-).(}{/\"'?"
    if s.endswith(".pdf"): s = s[:-4]
    if s.startswith("("): s = s[s.find(")"):]
    for char in chars: s = s.replace(char, "")
    return s.lower()

# Open the relevant stuff on file
pdfs = [f for f in os.listdir("Papers") if f.endswith(".pdf")]
pdfs = {trim(p): p[:-4] for p in pdfs}
with open("notes.md") as f:
    notes = f.read()
titles = {trim(l[2:].strip()): l[2:].strip()
 for l in notes.splitlines() if l.startswith("##")}

# Print the PDFs with no notes
print(f"There are {len(pdfs)} PDFs.")
print("The following PDFs have no notes:")
for pdf, title in sorted(pdfs.items(), key=lambda i: i[1]):
    if pdf not in titles:
        print("  " + title)
