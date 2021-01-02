import { record, randomSelect } from './httpHandlers'
import { Request, Response } from 'express'
import { Notes } from './notes'
import * as storage from './storage'
import { mocked } from 'ts-jest/utils'

jest.mock('./storage')

describe('Record HTTP endpoint', () => {
    const requestGenerator = (method: string, contentType: string) => {
        return {
            method,
            get: (name: string) => contentType,
            body: { notes: [] as Notes[] },
        } as Request
    }

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

    describe.each([
        ['GET', 405],
        ['PUT', 405],
        ['POST', 200],
    ])('testing with %s', (method, status) => {
        test(`expects status code of ${status}`, async () => {
            const request = requestGenerator(method, 'application/json')
            await record(request, response)
            expect(recordedStatus).toBe(status)
        })
    })

    describe('when checking content-type', () => {
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

    test('should handle exception when recording notes', async () => {
        const mockedStorage = mocked(storage)
        mockedStorage.record.mockImplementation(() => {
            throw new Error('Mocked error')
        })
        const request = requestGenerator('POST', 'application/json')
        await record(request, response)
        expect(recordedStatus).toBe(500)
        expect(mockedStorage.record.mock.calls.length).toBe(1)
    })
})

describe('RandomSelect HTTP endpoint', () => {
    let recordedStatus = 0
    let response: Response
    beforeEach(() => {
        response = {
            sendStatus: (status: number) => {
                recordedStatus = status
            },
            send: () => {
                recordedStatus = 200
            },
        } as Response
    })
    describe.each([
        ['GET', 200],
        ['PUT', 405],
        ['POST', 405],
    ])('testing with %s', (method, status) => {
        test(`expects status code of ${status}`, async () => {
            const request = { method } as Request
            await randomSelect(request, response)
            expect(recordedStatus).toBe(status)
        })
    })
    test('should handle exception when randomly selecting notes', async () => {
        const mockedStorage = mocked(storage)
        mockedStorage.randomSelect.mockImplementation(() => {
            throw new Error('Mocked error')
        })
        const request = { method: 'GET' } as Request
        await randomSelect(request, response)
        expect(recordedStatus).toBe(500)
        expect(mockedStorage.randomSelect.mock.calls.length).toBe(1)
    })
})
