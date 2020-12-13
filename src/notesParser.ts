import { parse } from 'node-html-parser'
import * as fs from 'fs'

export const parseNotes = (path: string) => {
    if (!fs.existsSync(path)) {
        throw new Error('error!')
    }
    const pathContent = fs.readFileSync(path, 'utf8')
    const root = parse(pathContent)
    return root.toString()
}
