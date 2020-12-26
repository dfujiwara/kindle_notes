import * as fs from 'fs'
import * as _ from 'lodash'
import { exit } from 'process';
import * as NotesParser from './notesParser'

export function watchHandler(event: string, fileName: string) {
    console.log(event, fileName);
    const results = NotesParser.parseNotes(fileName)
    console.log(results)
}

const argCount = process.argv.length
if (argCount != 3) {
    console.error('Wrong usage')
    exit(1)
}
const directory = process.argv[argCount - 1]
if (!fs.existsSync(directory)) {
  console.error(`Error, the path '${directory}' doesn't exist`);
  exit(1)
}
fs.watch(directory, _.debounce(watchHandler, 250));
