import * as express from 'express'
import * as storage from './storage'
import { Notes } from './notes'

export async function record(req: express.Request, res: express.Response): Promise<void> {
    switch (req.method) {
        case 'POST':
            break
        default:
            res.sendStatus(405)
            return
    }
    switch (req.get('content-type')) {
        case 'application/json':
            break
        default:
            res.sendStatus(400)
            return
    }
    const notes: Notes = req.body.notes
    try {
        await storage.record(notes)
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export async function randomSelect(req: express.Request, res: express.Response): Promise<void> {
    switch (req.method) {
        case 'GET':
            break
        default:
            res.sendStatus(405)
            return
    }
    try {
        const note = await storage.randomSelect()
        res.send({ note })
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}
