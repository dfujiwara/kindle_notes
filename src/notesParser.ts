import { parse, valid } from 'node-html-parser'
import * as fs from 'fs'

type Notes = {
    title: string,
    notes: string[]
}
const bookTitleClassName = '.bookTitle'
const noteTextClassName = '.noteText'

export const parseNotes = (path: string): Notes => {
    if (!fs.existsSync(path)) {
        throw new Error(`Error, the path ${path} doesn't exist`)
    }
    const pathContent = fs.readFileSync(path, 'utf8')
    //if (!valid(pathContent)) {
    //    throw new Error(`Error, the content in ${path} isn't considered valid`)
    //}
    const root = parse(pathContent)
    const title = root.querySelector(bookTitleClassName)
    const notes = root.querySelector(noteTextClassName)
    console.log(notes)
    return { title: title.rawText.trim(), notes: [notes.rawText.trim()]}
}
