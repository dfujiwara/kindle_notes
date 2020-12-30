import * as fs from 'fs'
import { Notes } from './notes'
import { Parser } from 'htmlparser2'

enum Mode {
    title,
    notes,
    others,
}
class NotesParser {
    title = ''
    notes: string[] = []
    mode: Mode = Mode.others
    private currentBuffer = ''

    onopentag(
        name: string,
        attribs: {
            [s: string]: string
        },
    ) {
        this.processBuffer()
        if (attribs['class'] == 'bookTitle') {
            this.mode = Mode.title
            return
        }
        if (attribs['class'] == 'noteText') {
            this.mode = Mode.notes
            return
        }
        this.mode = Mode.others
    }

    ontext(text: string) {
        const trimmedText = text.trim()
        switch (this.mode) {
            case Mode.title:
                this.currentBuffer += trimmedText
                break
            case Mode.notes:
                this.currentBuffer += trimmedText
                break
            case Mode.others:
                break
        }
    }

    onclosetag(name: string) {
        this.processBuffer()
        this.mode = Mode.others
    }

    private processBuffer() {
        if (this.currentBuffer.length == 0) {
            return
        }
        const trimmedBuffer = this.currentBuffer.trim()
        switch (this.mode) {
            case Mode.title:
                this.title = trimmedBuffer
                break
            case Mode.notes:
                this.notes.push(trimmedBuffer)
                break
            case Mode.others:
                break
        }
        this.currentBuffer = ''
    }
}

export const parseNotes = (path: string): Notes => {
    if (!fs.existsSync(path)) {
        throw new Error(`Error, the path ${path} doesn't exist`)
    }
    const pathContent = fs.readFileSync(path, 'utf8')
    const notesParser = new NotesParser()
    const parser = new Parser(notesParser)
    parser.parseComplete(pathContent)
    return { title: notesParser.title, notes: notesParser.notes }
}
