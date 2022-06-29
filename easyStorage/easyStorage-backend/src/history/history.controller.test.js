const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const historyController = require('./history.controller');
const historyService = require('./history.service');

jest.mock('./history.service');

describe('ItemController tests', () => {
    let mockData;
    let response;
    let nextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

        mockData = [
            {
                id: 1,
                username: 'Gábor László',
                action: 'Letrehozás',
                name: 'Mélységmérő',
                drawingNumber: 'EB-0025-02',
                quantityOfChange: 'nincs',
                updatedAt: new Date('2022.02.16')
            },
            {
                id: 2,
                username: 'Gábor László',
                action: 'Kitárolás',
                name: 'Töltsd ki!',
                drawingNumber: 'ES-0274-00',
                quantityOfChange: '-6 db',
                updatedAt: new Date('2022.05.11')
            },
            {
                id: 3,
                username: 'Gábor László',
                action: 'Kitárolás',
                name: 'Töltsd ki!',
                drawingNumber: 'ES-0233-00',
                quantityOfChange: '-2 db',
                updatedAt: new Date('2022.03.18')
            },
            {
                id: 4,
                username: 'Gábor László',
                action: 'Betárolás',
                name: 'Töltsd ki!',
                drawingNumber: 'ES-0311-06OA',
                quantityOfChange: '+2 db',
                updatedAt: new Date('2022.01.10')
            },
            {
                id: 5,
                username: 'Gábor László',
                action: 'Kitárolás',
                name: 'Töltsd ki!',
                drawingNumber: 'ES-0077-00',
                quantityOfChange: '-2 db',
                updatedAt: new Date('2022.06.12')
            }
        ];

        historyService.__setMockData(mockData);

        response = mockResponse();
        nextFunction = jest.fn();
    });

    test('create() with valid request body', () => {
        const newHistoryItem = {
            "username": 'Furatellenőrző',
            "action": 'Betárolás',
            "name": "Test Admin",
            "drawingNumber": "EB-0210-00",
            "quantityOfChange": "+3 db"
        };

        const request = mockRequest({
            body: {
                ...newHistoryItem
            }
        });

        return historyController.create(request, response, nextFunction)
            .then(() => {
                const responseHistoryItem = {
                    id: mockData[mockData.length - 1].id + 1,
                    username: 'Furatellenőrző',
                    action: 'Betárolás',
                    name: "Test Admin",
                    drawingNumber: "EB-0210-00",
                    quantityOfChange: "+3 db"
                }
                expect(historyService.create).toBeCalledWith(request.body);
                expect(response.json).toBeCalledWith(responseHistoryItem);
            });
    });

    test('create() with invalid request body', () => {
        const invalidUser = {
            "username": 'Spec. tokmány',
            "name": "Test User",
            "quantityOfChange": "nincs"
        };

        const request = mockRequest({
            body: {
                ...invalidUser
            }
        });

        return historyController.create(request, response, nextFunction)
            .then(() => {
                expect(nextFunction).toBeCalledWith(new createError.BadRequest('ValidationError: drawingNumber: Path `drawingNumber` is required., action: Path `action` is required.'));
                expect(response.json).not.toBeCalled();
            });
    });

    test('findAll()', () => {
        const NUMBER_OF_PREVIOUS_ROWS = 2;
        const NUMBER_OF_ROWS = 2;

        const request = mockRequest({
            query: {
                numberOfPreviousRows: NUMBER_OF_PREVIOUS_ROWS,
                numberOfRows: NUMBER_OF_ROWS
            }
        });

        return historyController.findAll(request, response, nextFunction)
            .then(() => {
                expect(historyService.findAll).toBeCalledWith(request.query);
                const onePageHistoryItems = mockData
                    .sort((previousItem, actualItem) => previousItem.updatedAt > actualItem.updatedAt ? -1 : (previousItem.updatedAt > actualItem.updatedAt) ? 1 : 0)
                    .slice(NUMBER_OF_PREVIOUS_ROWS, NUMBER_OF_PREVIOUS_ROWS + NUMBER_OF_ROWS);
                expect(response.json).toBeCalledWith(onePageHistoryItems);
            });
    });

    test('findFiltered()', () => {
        const FILTER_STRING = 'tárolás';
        const FILTER_REGEXP = new RegExp('.*' + FILTER_STRING + '.*', 'i');

        const request = mockRequest({
            query: {
                filter: FILTER_STRING
            }
        });

        return historyController.findFiltered(request, response, nextFunction)
            .then(() => {
                expect(historyService.findFiltered).toBeCalledWith(FILTER_REGEXP);

                const filteredAndSortedHistoryItems = mockData
                    .filter(historyItem => {
                        for (property in historyItem) {
                            if (typeof historyItem[property] === 'string') {
                                const lowerCaseValue = historyItem[property].toLowerCase();
                                if (lowerCaseValue.includes(FILTER_STRING)) {
                                    return historyItem;
                                }
                            }
                        }})
                    .sort((previousItem, actualItem) => previousItem.updatedAt > actualItem.updatedAt ? -1 : (previousItem.updatedAt > actualItem.updatedAt) ? 1 : 0)
                expect(response.json).toBeCalledWith(filteredAndSortedHistoryItems);
            });
    });
});