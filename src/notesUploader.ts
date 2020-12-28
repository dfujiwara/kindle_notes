import { Notes } from './notes'
import fetch from 'node-fetch'

const url = 'http://localhost:8080'

export async function upload(notes: Notes): Promise<void> {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ notes }),
    })
    const json = await response.json()
    console.log(json)
}
