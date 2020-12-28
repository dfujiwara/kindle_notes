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
