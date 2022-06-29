const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const userController = require('./user.controller');
const userService = require('./user.service');

jest.mock('./user.service');

describe('PersonController tests', () => {
    let mockData;
    let response;
    let nextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

        mockData = [
            {
                id: 1,
                firstName: 'Tibi',
                lastName: 'Fekte',
                username: 'ftibi',
                password: 'ftibi123',
                position: 'Mérnök',
                idAdmin: true,
            },
            {
                id: 2,
                firstName: 'Laci',
                lastName: 'Énekes',
                username: 'elaci',
                password: 'elaci123',
                position: 'Techológus',
                idAdmin: false,
            },
            {
                id: 3,
                firstName: 'Ádám',
                lastName: 'Fülöp',
                username: 'fadam',
                password: 'fadam123',
                position: 'Termelésirányító',
                idAdmin: true,
            },
            {
                id: 4,
                firstName: 'Laci',
                lastName: 'Gábor',
                username: 'glaci',
                password: 'glaci123',
                position: 'Mérnök',
                idAdmin: false,
            }
        ];

        userService.__setMockData(mockData);

        response = mockResponse();
        nextFunction = jest.fn();
    });

    test('create() with valid request body', () => {
        const newUser = {
            "firstName": 'Timi',
            "lastName": 'Szász',
            "username": 'sztimi',
            "password": 'sztimi123',
            "position": 'Technológus',
            "idAdmin": false,
        };

        const request = mockRequest({
            body: {
                ...newUser
            }
        });

        return userController.create(request, response, nextFunction)
            .then(() => {
                const responseUser = {
                    id: mockData[mockData.length - 1].id + 1,
                    firstName: 'Timi',
                    lastName: 'Szász',
                    username: 'sztimi',
                    password: 'sztimi123',
                    position: 'Technológus',
                    idAdmin: false,
                }
                expect(userService.create).toBeCalledWith(request.body);
                expect(response.json).toBeCalledWith(responseUser);
            });
    });

    test('create() with invalid request body', () => {
        const invalidUser = {
            "firstName": 'Timi',
            "username": 'sztimi',
            "position": 'Technológus',
            "idAdmin": false,
        };

        const request = mockRequest({
            body: {
                ...invalidUser
            }
        });

        return userController.create(request, response, nextFunction)
            .then(() => {
                expect(nextFunction).toBeCalledWith(new createError.BadRequest('ValidationError: password: Path `password` is required., lastName: Path `lastName` is required.'));
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

        return userController.findOne(request, response, nextFunction)
            .then(() => {
                expect(userService.findOne).toBeCalledWith(PERSON_ID);
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

        return userController.findOne(request, response, nextFunction)
            .then(() => {
                expect(userService.findOne).toBeCalledWith(INVALID_PERSON_ID);
                expect(nextFunction).toBeCalledWith(new createError.NotFound(`User with ${request.params.id} not found!`));
                expect(response.json).not.toBeCalled();
            });
    });

    test('findAll()', () => {
        const request = mockRequest();

        return userController.findAll(request, response, nextFunction)
            .then(() => {
                expect(userService.findAll).toBeCalled();
                expect(response.json).toBeCalledWith(mockData);
            });
    });

    test('update() with valid ID', () => {
        const UPDATE_USER_ID = 4;
        const UPDATE_FIRSTNAME = 'László';
        const UPDATE_POSITION = 'Technológus';

        const request = mockRequest({
            params: {
                id: UPDATE_USER_ID
            },
            body: {
                "firstName": UPDATE_FIRSTNAME,
                "position": UPDATE_POSITION
            }
        });

        return userController.update(request, response, nextFunction)
            .then(() => {
                const responsePerson = {
                    id: UPDATE_USER_ID,
                    firstName: UPDATE_FIRSTNAME,
                    lastName: 'Gábor',
                    username: 'glaci',
                    password: 'glaci123',
                    position: UPDATE_POSITION,
                    idAdmin: false,
                }

                expect(userService.update).toBeCalledWith(request.params.id, request.body);
                expect(response.json).toBeCalledWith(responsePerson);
            });
    });

    test('update() with invalid ID', () => {
        const INVALID_PERSON_ID = 7;
        const UPDATE_FIRSTNAME = 'László';
        const UPDATE_POSITION = 'Technológus';

        const request = mockRequest({
            params: {
                id: INVALID_PERSON_ID
            },
            body: {
                "firstName": UPDATE_FIRSTNAME,
                "position": UPDATE_POSITION
            }
        });

        return userController.update(request, response, nextFunction)
            .then(() => {
                expect(userService.update).toBeCalledWith(request.params.id, request.body);
                expect(nextFunction).toBeCalledWith(new createError.NotFound(`User with ${request.params.id} not found!`));
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

        return userController.delete(request, response, nextFunction)
            .then(() => {
                expect(userService.delete).toBeCalledWith(PERSON_ID);
                expect(response.json).toBeCalledWith({});
            });
    });
});