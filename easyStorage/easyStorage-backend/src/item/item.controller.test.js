const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const itemController = require('./item.controller');
const itemService = require('./item.service');

jest.mock('./item.service');

describe('ItemController tests', () => {
    let mockData;
    let response;
    let nextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

        mockData = [
            {
                id: 1,
                name: 'Spec. csapmegmunkáló',
                drawingNumber: 'ES-0118-00',
                customerDrawingNumber: '380-A2523-06',
                storage: {
                    storageName: 'Megamat1',
                    shelf: 9,
                    box: 171
                },
                quantity: 3
            },
            {
                id: 2,
                name: 'Spec. süllyesztő D50/D45',
                drawingNumber: 'ES-0075-00',
                customerDrawingNumber: '380-A3049-00',
                storage: { 
                    storageName: 'Megamat1', 
                    shelf: 9, 
                    box: 172 
                },
                quantity: 3
            },
            {
                id: 3,
                name: 'Spec. fúró',
                drawingNumber: 'ES-0208-00',
                customerDrawingNumber: '380-A3897-00',
                storage: {
                    storageName: 'Megamat1',
                    shelf: 9,
                    box: 174
                },
                quantity: 6
            },
            {
                id: 4,
                name: 'AxisPro',
                drawingNumber: 'EB-0569-00',
                storage: {
                    storageName: 'Megamat2',
                    shelf: 10,
                    box: 175
                },
                quantity: 1
            }
        ];

        itemService.__setMockData(mockData);

        response = mockResponse();
        nextFunction = jest.fn();
    });

    test('create() with valid request body', () => {
        const newUser = {
            "name": 'Mélységmérő',
            "drawingNumber": 'EB-0102-00',
            "storage": {
                "storageName": "Megamat2",
                "shelf": 2,
                "box": 62
            },
            "quantity": 3
        };

        const request = mockRequest({
            body: {
                ...newUser
            }
        });

        return itemController.create(request, response, nextFunction)
            .then(() => {
                const responseItem = {
                    id: mockData[mockData.length - 1].id + 1,
                    name: 'Mélységmérő',
                    drawingNumber: 'EB-0102-00',
                    storage: {
                        storageName: 'Megamat2',
                        shelf: 2,
                        box: 62
                    },
                    quantity: 3
                }
                expect(itemService.create).toBeCalledWith(request.body);
                expect(response.json).toBeCalledWith(responseItem);
            });
    });

    test('create() with invalid request body', () => {
        const invalidUser = {
            "name": 'AxisPro L',
            "drawingNumber": 'EB-0545-00',
            "quantity": 1
        };

        const request = mockRequest({
            body: {
                ...invalidUser
            }
        });

        return itemController.create(request, response, nextFunction)
            .then(() => {
                expect(nextFunction).toBeCalledWith(new createError.BadRequest('ValidationError: storage.shelf: Path `storage.shelf` is required., storage.storageName: Path `storage.storageName` is required.'));
                expect(response.json).not.toBeCalled();
            });
    });

    test('findOne() with valid ID', () => {
        const PERSON_ID = 1;

        const request = mockRequest({
            params: {
                id: PERSON_ID
            }
        });

        return itemController.findOne(request, response, nextFunction)
            .then(() => {
                expect(itemService.findOne).toBeCalledWith(PERSON_ID);
                expect(response.json).toBeCalledWith(mockData.find(user => user.id === PERSON_ID));
            });
    });

    test('findOne() with invalid ID', () => {
        const INVALID_PERSON_ID = 7;

        const request = mockRequest({
            params: {
                id: INVALID_PERSON_ID
            }
        });

        return itemController.findOne(request, response, nextFunction)
            .then(() => {
                expect(itemService.findOne).toBeCalledWith(INVALID_PERSON_ID);
                expect(nextFunction).toBeCalledWith(new createError.NotFound(`Item with ${request.params.id} not found!`));
                expect(response.json).not.toBeCalled();
            });
    });

    test('findAll()', () => {
        const request = mockRequest();

        return itemController.findAll(request, response, nextFunction)
            .then(() => {
                expect(itemService.findAll).toBeCalled();
                expect(response.json).toBeCalledWith(mockData);
            });
    });

    test('findForExport()', () => {
        const request = mockRequest();

        return itemController.findToExport(request, response, nextFunction)
            .then(() => {
                expect(itemService.findToExport).toBeCalled();
                expect(response.json).toBeCalledWith(mockData.map(item => {
                    const itemToExport = {
                        name: item.name,
                        drawingNumber: item.drawingNumber,
                        customerDrawingNumber: item.customerDrawingNumber ? item.customerDrawingNumber : '-',
                        storageName: item.storage.storageName,
                        shelf: item.storage.shelf,
                        box: item.storage.box ? item.storage.box : '-',
                        quantity: item.quantity
                    }

                    return itemToExport;
                }));
            });
    });

    test('update() with valid ID', () => {
        const UPDATE_USER_ID = 4;
        const UPDATE_NAME = 'AxisPro M';
        const UPDATE_STORAGENAME = 'Megamat1';

        const request = mockRequest({
            params: {
                id: UPDATE_USER_ID
            },
            body: {
                "name": UPDATE_NAME,
                "drawingNumber": 'EB-0569-00',
                "storage": {
                    "storageName": UPDATE_STORAGENAME,
                    "shelf": 10,
                    "box": 175
                },
                "quantity": 1
            }
        });

        return itemController.update(request, response, nextFunction)
            .then(() => {
                const responseItem = {
                    id: 4,
                    name: UPDATE_NAME,
                    drawingNumber: 'EB-0569-00',
                    storage: {
                        storageName: UPDATE_STORAGENAME,
                        shelf: 10,
                        box: 175
                    },
                    quantity: 1
                }

                expect(itemService.update).toBeCalledWith(request.params.id, request.body);
                expect(response.json).toBeCalledWith(responseItem);
            });
    });

    test('update() with invalid ID', () => {
        const INVALID_PERSON_ID = 7;
        const UPDATE_NAME = 'AxisPro M';
        const UPDATE_STORAGENAME = 'Megamat1';

        const request = mockRequest({
            params: {
                id: INVALID_PERSON_ID
            },
            body: {
                "name": UPDATE_NAME,
                "drawingNumber": 'EB-0569-00',
                "storage": {
                    "storageName": UPDATE_STORAGENAME,
                    "shelf": 10,
                    "box": 175
                },
                "quantity": 1
            }
        });

        return itemController.update(request, response, nextFunction)
            .then(() => {
                expect(itemService.update).toBeCalledWith(request.params.id, request.body);
                expect(nextFunction).toBeCalledWith(new createError.NotFound(`Item with ${request.params.id} not found!`));
                expect(response.json).not.toBeCalled();
            });
    });

    test('delete() with valid ID', () => {
        const PERSON_ID = 1;

        const request = mockRequest({
            params: {
                id: PERSON_ID
            }
        });

        return itemController.delete(request, response, nextFunction)
            .then(() => {
                expect(itemService.delete).toBeCalledWith(PERSON_ID);
                expect(response.json).toBeCalledWith({});
            });
    });
});