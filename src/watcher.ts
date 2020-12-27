import * as fs from 'fs'
import * as path from 'path'
import * as _ from 'lodash'
import { exit } from 'process'
import * as NotesParser from './notesParser'

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
        const results = NotesParser.parseNotes(absolutePath)
        console.log(results)
    } catch (e) {
        console.error(e)
    }
}

fs.watch(directory, _.debounce(watchHandler, 250))
