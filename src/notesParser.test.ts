import * as NotesParser from './notesParser'

describe('Parsing notes', () => {
    test('should be empty', () => {
        const { title, notes } = NotesParser.parseNotes('')
        expect(title).toBe('')
        expect(notes.length).toBe(0)
    })
    test('should parse title', () => {
        const { title, notes } = NotesParser.parseNotes(titleOnlyContent)
        expect(title).toBe('The book title is here')
        expect(notes.length).toBe(0)
    })
    test('should parse title and message', () => {
        const { title, notes } = NotesParser.parseNotes(titleAndNotesContent)
        expect(title).toBe('The book title is here')
        expect(notes.length).toBe(1)
        expect(notes[0]).toBe('Notes should go here')
    })
    test('should parse title and message with malformed HTML', () => {
        const { title, notes } = NotesParser.parseNotes(titleAndNotesMalformedContent)
        expect(title).toBe('The book title is here')
        expect(notes.length).toBe(2)
        expect(notes).toEqual(['Notes should go here', 'Second notes should go here'])
    })
})

const titleOnlyContent = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "XHTML1-s.dtd" >
<html xmlns="http://www.w3.org/TR/1999/REC-html-in-xml" xml:lang="en" lang="en">

<head>
</head>
<body>
<div class='bodyContainer'>
    <h1>
        <div class='notebookFor'>Notes and highlights for</div>
        <div class='bookTitle'>The book title is here
        </div>
        <div class='authors'>
            Fujiwara, Daisuke
        </div>
    </h1>
    <hr />
</div>
</body>
`

const titleAndNotesContent = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "XHTML1-s.dtd" >
<html xmlns="http://www.w3.org/TR/1999/REC-html-in-xml" xml:lang="en" lang="en">

<head>
</head>
<body>
<div class='bodyContainer'>
    <h1>
        <div class='notebookFor'>Notes and highlights for</div>
        <div class='bookTitle'>The book title is here
        </div>
        <div class='authors'>
            Fujiwara, Daisuke
        </div>
    </h1>
    <hr />
<h2 class='sectionHeading'>Chapter 1: Chapter for Testing </h2>
<h3 class='noteHeading'>Highlight (<span class='highlight_blue'>blue</span>) - Location 74</div>
    <div class='noteText'>Notes should go here</div>
</h3>
</div>
</body>
`

const titleAndNotesMalformedContent = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "XHTML1-s.dtd" >
<html xmlns="http://www.w3.org/TR/1999/REC-html-in-xml" xml:lang="en" lang="en">

<head>
</head>
<body>
<div class='bodyContainer'>
    <h1>
        <div class='notebookFor'>Notes and highlights for</div>
        <div class='bookTitle'>The book title is here
        </div>
        <div class='authors'>
            Fujiwara, Daisuke
        </div>
    </h1>
    <hr />
<h2 class='sectionHeading'>Chapter 1: Chapter for Testing </h2>
<h3 class='noteHeading'>Highlight (<span class='highlight_blue'>blue</span>) - Location 74</div>
    <div class='noteText'>Notes should go here
</h3>
<h3 class='noteHeading'>Highlight (<span class='highlight_blue'>blue</span>) - Location 101</div>
    <div class='noteText'>Second notes should go here
</h3>
</div>
</body>
`
