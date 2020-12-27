import * as express from 'express'

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
    console.log(req.body)
    res.send('hello')
}
