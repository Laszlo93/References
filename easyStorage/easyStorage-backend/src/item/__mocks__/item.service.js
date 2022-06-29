const itemService = jest.mock('./item.service');

let mockData;

itemService.create = jest.fn(item => {
    item.id = mockData[mockData.length - 1].id + 1;
    return Promise.resolve(item);
});

itemService.findAll = jest.fn(() => {
    return Promise.resolve(mockData);
});

itemService.findToExport = jest.fn(() => {
    return Promise.resolve(mockData.map(item => {
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

itemService.findOne = jest.fn(id => {
    return Promise.resolve(mockData.find(user => user.id === id));
});

itemService.update = jest.fn((id, itemData) => {
    return Promise.resolve(mockData.find(item => item.id === id) ? Object.assign(mockData.find(item => item.id === id), itemData) : mockData.find(item => item.id === id));
});

itemService.delete = jest.fn(id => {
    return Promise.resolve({});
});

itemService.__setMockData = data => {
    mockData = data;
}

module.exports = itemService;