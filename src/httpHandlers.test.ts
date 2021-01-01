import { record, randomSelect } from './httpHandlers'
import { Request, Response } from 'express'
import { Notes } from './notes'
import * as storage from './storage'

jest.mock('./storage')

describe('Record HTTP endpoint', () => {
    const requestGenerator = (method: string, contentType: string) => {
        return {
            method,
            get: (name: string) => contentType,
            body: { notes: [] as Notes[] },
        } as Request
    }

    test('should only support POST method', async () => {
        const configuration: [string, number][] = [
            ['GET', 405],
            ['PUT', 405],
            ['POST', 200],
        ]
        configuration.forEach(async ([method, status]) => {
            let recordedStatus = 0
            const response = {
                sendStatus: (status: number) => {
                    recordedStatus = status
                },
            } as Response
            const request = requestGenerator(method, 'application/json')
            await record(request, response)
            expect(recordedStatus).toBe(status)
        })
    })

    describe('content type', () => {
        let recordedStatus = 0
        let response: Response
        beforeEach(() => {
            recordedStatus = 0
            response = {
                sendStatus: (status: number) => {
                    recordedStatus = status
                },
            } as Response
        })
        test('should reject content type that is not application/json', async () => {
            const request = requestGenerator('POST', 'text/html')
            await record(request, response)
            expect(recordedStatus).toBe(400)
        })
        test('should accept content type that is application/json', async () => {
            const request = requestGenerator('POST', 'application/json')
            await record(request, response)
            expect(recordedStatus).toBe(200)
        })
    })
})

describe('RandomSelect HTTP endpoint', () => {
    test('should only support GET method', async () => {
        const configuration: [string, number][] = [
            ['GET', 200],
            ['PUT', 405],
            ['POST', 405],
        ]
        configuration.forEach(async ([method, status]) => {
            let recordedStatus = 0
            const response = {
                sendStatus: (status: number) => {
                    recordedStatus = status
                },
                send: () => {
                    recordedStatus = 200
                },
            } as Response
            const request = { method } as Request
            await randomSelect(request, response)
            expect(recordedStatus).toBe(status)
        })
    })
})
