import { Notes } from './notes'
import fetch from 'node-fetch'

const url = 'https://us-central1-df-side-projects.cloudfunctions.net/kindle-notes-record'

export async function upload(notes: Notes): Promise<void> {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ notes }),
    })
    console.log(response)
}
