import { Firestore } from '@google-cloud/firestore'
import { Notes } from './notes'

const bookCollectionName = 'kindle_book'
const notesCollectionName = 'kindle_notes'

export async function record(notes: Notes): Promise<Notes> {
    const firestore = new Firestore()
    const batch = firestore.batch()
    const docRef = firestore.collection(bookCollectionName).doc(notes.title)
    batch.set(docRef, { title: notes.title })

    const notesCollection = docRef.collection(notesCollectionName)
    notes.notes.forEach((note) => {
        const noteRef = notesCollection.doc()
        batch.set(noteRef, { note: note })
    })
    await batch.commit()
    return notes
}

function selectRandomElement<T>(list: T[]): T {
    if (list.length == 0) {
        throw 'Error'
    }
    const index = Math.floor(Math.random() * Math.floor(list.length))
    return list[index]
}

export async function randomSelect(): Promise<{ title: string; note: string }> {
    const firestore = new Firestore()
    const books = await firestore.collection(bookCollectionName).get()
    const randomlySelectedBook = selectRandomElement(books.docs)
    const notes = await randomlySelectedBook.ref.collection(notesCollectionName).get()
    const randomlySelectedNote = selectRandomElement(notes.docs)
    return { title: randomlySelectedBook.id, note: randomlySelectedNote.get('note') }
}
