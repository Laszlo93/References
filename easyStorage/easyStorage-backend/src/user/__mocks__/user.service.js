const userService = jest.mock('./user.service');

let mockData;

userService.create = jest.fn(user => {
    user.id = mockData[mockData.length - 1].id + 1;
    return Promise.resolve(user);
});

userService.findAll = jest.fn(() => {
    return Promise.resolve(mockData);
});

userService.findOne = jest.fn(id => {
    return Promise.resolve(mockData.find(user => user.id === id));
});

userService.update = jest.fn((id, userData) => {
    return Promise.resolve(mockData.find(user => user.id === id) ? Object.assign(mockData.find(user => user.id === id), userData) : mockData.find(user => user.id === id));
});

userService.delete = jest.fn(id => {
    return Promise.resolve({});
});

userService.__setMockData = data => {
    mockData = data;
}

module.exports = userService;