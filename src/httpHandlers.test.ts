import { record, randomSelect } from './httpHandlers'
import { Request, Response } from 'express'

describe('Record HTTP endpoint', () => {
    test('should only support POST method', async () => {
        const configuration: [string, number][] = [
            ['GET', 405],
            ['PUT', 405],
            ['POST', 400],
        ]
        configuration.forEach(async ([method, status]) => {
            let recordedStatus = 0
            const response = {
                sendStatus: (status: number) => {
                    recordedStatus = status
                },
            } as Response
            const request = { method, get: (name: string) => 'text/html' } as Request
            await record(request, response)
            expect(recordedStatus).toBe(status)
        })
    })

    test('should only support content type of application/json', async () => {
        let recordedStatus = 0
        const request = { method: 'POST', get: (name: string) => 'text/html' } as Request
        const response = {
            sendStatus: (status: number) => {
                recordedStatus = status
            },
        } as Response
        await record(request, response)
        expect(recordedStatus).toBe(400)
    })
})
