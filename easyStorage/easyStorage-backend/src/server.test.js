const app = require("./server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require("./models/user.model");
const Item = require("./models/item.model");
const History = require("./models/history.model");
const Token = require("./models/token.model");

describe('REST API integration tests', () => {
    // const loggedInUser = {
    //     firstName: 'Admin',
    //     lastName: 'Test',
    //     username: 'admin',
    //     password: 'admin123',
    //     position: 'Mérnök',
    //     idAdmin: true,
    // }

    const insertUserData = [
        {
            firstName: 'Tibi',
            lastName: 'Fekte',
            username: 'ftibi',
            password: '$2b$10$hmrnNUhrEfC5F/n9sEQCyu69laxoBNXOZPBmb.WDoA8VzoKo2jL66',
            position: 'Mérnök',
            idAdmin: false,
        },
        {
            firstName: 'Laci',
            lastName: 'Énekes',
            username: 'elaci',
            password: 'elaci123',
            position: 'Techológus',
            idAdmin: false,
        },
        {
            firstName: 'Ádám',
            lastName: 'Fülöp',
            username: 'fadam',
            password: 'fadam123',
            position: 'Termelésirányító',
            idAdmin: true,
        },
        {
            firstName: 'Laci',
            lastName: 'Gábor',
            username: 'glaci',
            password: 'glaci123',
            position: 'Mérnök',
            idAdmin: false,
        }
    ];

    const insertItemData = [
        {
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
            name: 'Spec. süllyesztő D50/D45',
            drawingNumber: 'ES-0075-00',
            customerDrawingNumber: '380-A3049-00',
            storage: { storageName: 'Megamat1', shelf: 9, box: 172 },
            quantity: 3
        },
        {
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

    const insertHistoryData = [
        {
            username: 'Gábor László',
            action: 'Letrehozás',
            name: 'Mélységmérő',
            drawingNumber: 'EB-0025-02',
            quantityOfChange: 'nincs',
            updatedAt: new Date('2022.02.16')
        },
        {
            username: 'Gábor László',
            action: 'Kitárolás',
            name: 'Töltsd ki!',
            drawingNumber: 'ES-0274-00',
            quantityOfChange: '-6 db',
            updatedAt: new Date('2022.05.11')
        },
        {
            username: 'Gábor László',
            action: 'Kitárolás',
            name: 'Töltsd ki!',
            drawingNumber: 'ES-0233-00',
            quantityOfChange: '-2 db',
            updatedAt: new Date('2022.03.18')
        },
        {
            username: 'Gábor László',
            action: 'Betárolás',
            name: 'Töltsd ki!',
            drawingNumber: 'ES-0311-06OA',
            quantityOfChange: '+2 db',
            updatedAt: new Date('2022.01.10')
        },
        {
            username: 'Gábor László',
            action: 'Kitárolás',
            name: 'Töltsd ki!',
            drawingNumber: 'ES-0077-00',
            quantityOfChange: '-2 db',
            updatedAt: new Date('2022.06.12')
        }
    ]

    // const token = jwt.sign({
    //     _id: loggedInUser.id,
    //     username: loggedInUser.username,
    //     name: `${loggedInUser.lastName} ${loggedInUser.firstName}`,
    //     isAdmin: loggedInUser.isAdmin
    // }, config.access_token_secret_key);

    let accessToken = '';
    let refreshToken = {
        token: ''
    }

    beforeEach(async () => {
        const mongoConnection = await mongoose.connect(`mongodb+srv://${config.test_database.user}:${config.test_database.password}@${config.test_database.host}`);
        console.log('MongoDB connection established.');
        return mongoConnection;
    });

    afterEach(async () => {
        await mongoose.connection.db.dropDatabase();
        const mongoDisconnect = await mongoose.connection.close();
        console.log('MongoDB connection closed!');
        return mongoDisconnect;
    });

    afterAll(() => {
        accessToken = '';
        refreshToken.token = '';
    });

    describe('REST API integration test - users', () => {
        test('POST api/login endpoint test', async () => {
            await User.insertMany(insertUserData);
            
            const user = {
                username: "ftibi",
                password: "ftibi123"
            }
    
            const response = await supertest(app)
                .post('/api/login')
                .send(user)
                .expect(200);
    
            accessToken = response.body.accessToken;
            refreshToken.token = response.body.refreshToken;
    
            await Token.create(refreshToken);
        });
    });

    describe('REST API integration test - users', () => {
        test('POST api/users/add endpoint test', async () => {
            const newUser = {
                firstName: 'András',
                lastName: 'Póra',
                username: 'pandras',
                password: 'ftibi123',
                position: 'Technológus',
                idAdmin: true,
            }

            const response = await supertest(app)
                .post('/api/users/add')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(newUser)
                .expect(201);
            expect(response.body.firstName).toBe(newUser.firstName);
            expect(response.body.lastName).toBe(newUser.lastName);
            expect(response.body.username).toBe(newUser.username);
            expect(response.body.position).toBe(newUser.position);
            expect(response.body.isAdmin).toBe(newUser.isAdmin);
        });
    
        test('GET api/users/users-list endpoint test', async () => {
            await User.insertMany(insertUserData);
            const response = await supertest(app)
                .get('/api/users/users-list')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBe(insertUserData.length);
            response.body.forEach((user, index) => {
                expect(user.firstName).toBe(insertUserData[index].firstName);
                expect(user.lastName).toBe(insertUserData[index].lastName);
                expect(user.username).toBe(insertUserData[index].username);
                expect(user.password).toBe(insertUserData[index].password);
                expect(user.position).toBe(insertUserData[index].position);
                expect(user.isAdmin).toBe(insertUserData[index].isAdmin);
            });
        });
    
        test('GET api/users/:id endpoint test', async () => {
            const testUsers = await User.insertMany(insertUserData);
            const secondPersonId = testUsers[1]._id;
            const response = await supertest(app)
                .get(`/api/users/${secondPersonId.toString()}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
            expect(response.body._id).toBe(secondPersonId.toString());
            expect(response.body.firstName).toBe(insertUserData[1].firstName);
            expect(response.body.lastName).toBe(insertUserData[1].lastName);
            expect(response.body.username).toBe(insertUserData[1].username);
            expect(response.body.password).toBe(insertUserData[1].password);
            expect(response.body.position).toBe(insertUserData[1].position);
            expect(response.body.isAdmin).toBe(insertUserData[1].isAdmin);
        });
    
        test('PUT api/users/:id endpoint test', async () => {
            const testUsers = await User.insertMany(insertUserData);
            const fourthPersonId = testUsers[3]._id;
            const updatedUser = {
                firstName: 'Laci',
                lastName: 'Gábor',
                username: 'glaci',
                password: 'glaci123',
                position: 'Technológus',
                isAdmin: true
            }
            const response = await supertest(app)
                .put(`/api/users/${fourthPersonId.toString()}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send(updatedUser)
                .expect(200);
            expect(response.body._id).toBe(fourthPersonId.toString());
            expect(response.body.firstName).toBe(updatedUser.firstName);
            expect(response.body.lastName).toBe(updatedUser.lastName);
            expect(response.body.username).toBe(updatedUser.username);
            expect(response.body.position).toBe(updatedUser.position);
            expect(response.body.isAdmin).toBe(updatedUser.isAdmin);
        });
    
        test('DELETE api/users/:id endpoint test', async () => {
            const testUsers = await User.insertMany(insertUserData);
            const firstPersonId = testUsers[0]._id;
            const response = await supertest(app)
                .delete(`/api/users/${firstPersonId.toString()}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
            expect(response.body).toStrictEqual({});
        });
    });

    describe('REST API integration test - items', () => {
        test('POST api/items/add endpoint test', async () => {
            const newItem = {
                name: 'Spec. készülék',
                drawingNumber: 'ED-0256-00',
                customerDrawingNumber: '400052150521',
                storage: {
                    storageName: 'Megamat2',
                    shelf: 12,
                    box: 225
                },
                quantity: 1
            }

            const response = await supertest(app)
                .post('/api/items/add')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(newItem)
                .expect(201);
            expect(response.body.name).toBe(newItem.name);
            expect(response.body.drawingNumber).toBe(newItem.drawingNumber);
            expect(response.body.customerDrawingNumber).toBe(newItem.customerDrawingNumber);
            expect(response.body.storage.storageName).toBe(newItem.storage.storageName);
            expect(response.body.storage.shelf).toBe(newItem.storage.shelf);
            expect(response.body.storage.box).toBe(newItem.storage.box);
            expect(response.body.quantity).toBe(newItem.quantity);
        });
    
        test('GET api/items/items-list endpoint test', async () => {
            await Item.insertMany(insertItemData);
            const response = await supertest(app)
                .get('/api/items/items-list')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBe(insertItemData.length);
            response.body.forEach((item, index) => {
                expect(item.name).toBe(insertItemData[index].name);
                expect(item.drawingNumber).toBe(insertItemData[index].drawingNumber);
                expect(item.customerDrawingNumber).toBe(insertItemData[index].customerDrawingNumber);
                expect(item.storage.storageName).toBe(insertItemData[index].storage.storageName);
                expect(item.storage.shelf).toBe(insertItemData[index].storage.shelf);
                expect(item.storage.box).toBe(insertItemData[index].storage.box);
            });
        });

        test('GET api/items/export endpoint test', async () => {
            await Item.insertMany(insertItemData);
            const response = await supertest(app)
                .get('/api/items/export')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBe(insertItemData.length);
            response.body.forEach((item, index) => {
                const customerDrawingNumber = insertItemData[index].customerDrawingNumber ? insertItemData[index].customerDrawingNumber: '-';
                console.log(customerDrawingNumber);
                expect(item.name).toBe(insertItemData[index].name);
                expect(item.drawingNumber).toBe(insertItemData[index].drawingNumber);
                expect(item.customerDrawingNumber).toBe(insertItemData[index].customerDrawingNumber ? insertItemData[index].customerDrawingNumber: '-');
                expect(item.storageName).toBe(insertItemData[index].storage.storageName);
                expect(item.shelf).toBe(insertItemData[index].storage.shelf);
                expect(item.box).toBe(insertItemData[index].storage.box ? insertItemData[index].storage.box : '-');
            });
        });
    
        test('GET api/items/:id endpoint test', async () => {
            const testItems = await Item.insertMany(insertItemData);
            const secondItemId = testItems[1]._id;
            const response = await supertest(app)
                .get(`/api/items/${secondItemId.toString()}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
            expect(response.body.name).toBe(insertItemData[1].name);
            expect(response.body.drawingNumber).toBe(insertItemData[1].drawingNumber);
            expect(response.body.customerDrawingNumber).toBe(insertItemData[1].customerDrawingNumber);
            expect(response.body.storage.storageName).toBe(insertItemData[1].storage.storageName);
            expect(response.body.storage.shelf).toBe(insertItemData[1].storage.shelf);
            expect(response.body.storage.box).toBe(insertItemData[1].storage.box);        
        });
    
        test('PUT api/items/:id endpoint test', async () => {
            const testItems = await Item.insertMany(insertItemData);
            const fourthItemId = testItems[3]._id;
            const updatedItem = {
                name: 'AxisPro M',
                drawingNumber: 'EB-0545-00',
                storage: {
                    storageName: 'Megamat1',
                    shelf: 10,
                    box: 175
                },
                quantity: 1
            }
            const response = await supertest(app)
                .put(`/api/items/${fourthItemId.toString()}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send(updatedItem)
                .expect(200);
            expect(response.body._id).toBe(fourthItemId.toString());
            expect(response.body.firstName).toBe(updatedItem.firstName);
            expect(response.body.lastName).toBe(updatedItem.lastName);
            expect(response.body.username).toBe(updatedItem.username);
            expect(response.body.position).toBe(updatedItem.position);
            expect(response.body.isAdmin).toBe(updatedItem.isAdmin);
        });
    
        test('DELETE api/items/:id endpoint test', async () => {
            const testItems = await Item.insertMany(insertItemData);
            const firstItemId = testItems[0]._id;
            const response = await supertest(app)
                .delete(`/api/items/${firstItemId.toString()}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
            expect(response.body).toStrictEqual({});
        });
    });

    describe('REST API integration test - history', () => {
        test('POST api/history/add endpoint test', async () => {
            const newHistoryItem = {
                username: 'Fülöp Ádám',
                action: 'Törlés',
                name: 'Egyedi mérőeszköz',
                drawingNumber: 'EC-0111-00',
                quantityOfChange: 'nincs',
                updatedAt: new Date().setMilliseconds(0)
            }

            const response = await supertest(app)
                .post('/api/history/add')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(newHistoryItem)
                .expect(201);

            expect(response.body.username).toBe(newHistoryItem.username);
            expect(response.body.action).toBe(newHistoryItem.action);
            expect(response.body.name).toBe(newHistoryItem.name);
            expect(response.body.drawingNumber).toBe(newHistoryItem.drawingNumber);
            expect(response.body.quantityOfChange).toBe(newHistoryItem.quantityOfChange);
            expect(new Date(response.body.updatedAt).setMilliseconds(0)).toBe(newHistoryItem.updatedAt);
        });
    
        test('GET api/history endpoint test', async () => {
            await History.insertMany(insertHistoryData);

            const sortedInsertHistoryData = insertHistoryData
                .sort((previousItem, actualItem) => previousItem.updatedAt > actualItem.updatedAt ? -1 : (previousItem.updatedAt > actualItem.updatedAt) ? 1 : 0);
            
            const query = {
                numberOfPreviousRows: 3,
                numberOfRows: 2
            }
            const response = await supertest(app)
                .get('/api/history')
                .query(query)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);

            expect(Array.isArray(response.body.historyItems)).toBeTruthy();
            expect(response.body.historyItems.length).toBe(query.numberOfRows);
            response.body.historyItems.forEach((history, index) => {
                expect(history.username).toBe(sortedInsertHistoryData[index + query.numberOfPreviousRows].username);
                expect(history.action).toBe(sortedInsertHistoryData[index + query.numberOfPreviousRows].action);
                expect(history.name).toBe(sortedInsertHistoryData[index + query.numberOfPreviousRows].name);
                expect(history.drawingNumber).toBe(sortedInsertHistoryData[index + query.numberOfPreviousRows].drawingNumber);
                expect(history.quantityOfChange).toBe(sortedInsertHistoryData[index + query.numberOfPreviousRows].quantityOfChange);
            });
        });

        test('GET api/history/filtered endpoint test', async () => {
            await History.insertMany(insertHistoryData);

            const query = {
                filter: 'betárolás'
            }

            const sortedAndFilteredInsertHistoryData = insertHistoryData
                .filter(historyItem => {
                    for (property in historyItem) {
                        if (typeof historyItem[property] === 'string') {
                            const lowerCaseValue = historyItem[property].toLowerCase();
                            if (lowerCaseValue.includes(query.filter)) {
                                return historyItem;
                            }
                        }
                    }})
                .sort((previousItem, actualItem) => previousItem.updatedAt > actualItem.updatedAt ? -1 : (previousItem.updatedAt > actualItem.updatedAt) ? 1 : 0);
            

            const response = await supertest(app)
                .get('/api/history/filtered')
                .query(query)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBe(sortedAndFilteredInsertHistoryData.length);
            response.body.forEach((history, index) => {
                expect(history.username).toBe(sortedAndFilteredInsertHistoryData[index].username);
                expect(history.action).toBe(sortedAndFilteredInsertHistoryData[index].action);
                expect(history.name).toBe(sortedAndFilteredInsertHistoryData[index].name);
                expect(history.drawingNumber).toBe(sortedAndFilteredInsertHistoryData[index].drawingNumber);
                expect(history.quantityOfChange).toBe(sortedAndFilteredInsertHistoryData[index].quantityOfChange);
            });
        });
    
       
    });

    describe('REST API integration test - refresh', () => {
        test('POST api/refresh endpoint test', async () => {
            await Token.insertMany(refreshToken);

            await supertest(app)
                .post('/api/refresh')
                .send(refreshToken)
                .expect(200);
        });
    });

    describe('REST API integration test - logout', () => {
        test('POST api/logout endpoint test', async () => {
            await Token.create(refreshToken);

            await supertest(app)
                .post('/api/logout')
                .send(refreshToken)
                .expect(200);
        });
    });

});
