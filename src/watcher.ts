import * as fs from 'fs'
import * as path from 'path'
import * as _ from 'lodash'
import { exit } from 'process'
import * as NotesParser from './notesParser'
import * as NotesUploader from './notesUploader'

const argCount = process.argv.length
if (argCount != 3) {
    console.error('Wrong usage')
    exit(1)
}
const directory = process.argv[argCount - 1]
if (!fs.existsSync(directory)) {
    console.error(`Error, the path '${directory}' doesn't exist`)
    exit(1)
}

export function watchHandler(event: string, fileName: string): void {
    const absolutePath = path.join(directory, fileName)
    console.log(event, absolutePath)
    try {
        const pathContent = fs.readFileSync(absolutePath, 'utf8')
        const notes = NotesParser.parseNotes(pathContent)
        NotesUploader.upload(notes)
    } catch (e) {
        console.error(e)
    }
}

console.log('Starting the watcher')
fs.watch(directory, _.debounce(watchHandler, 250))
