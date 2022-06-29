const historyService = jest.mock('./history.service');

let mockData;

historyService.create = jest.fn(item => {
    item.id = mockData[mockData.length - 1].id + 1;
    return Promise.resolve(item);
});

historyService.findAll = jest.fn((filter) => {
    const onePageHistoryItem = mockData
        .sort((previousItem, actualItem) => previousItem.updatedAt > actualItem.updatedAt ? -1 : (previousItem.updatedAt > actualItem.updatedAt) ? 1 : 0)
        .slice(filter.numberOfPreviousRows, filter.numberOfPreviousRows + filter.numberOfRows);
    
    return Promise.resolve(onePageHistoryItem);
});

historyService.findFiltered = jest.fn((filterString) => {
    const filteredAndSortedHistoryItems = mockData
        .filter(historyItem => {
            for (property in historyItem) {
                if (typeof historyItem[property] === 'string') {
                    const lowerCaseValue = historyItem[property].toLowerCase();
                    if (filterString.test(lowerCaseValue)) {
                        return historyItem;
                    }
                }
            }        
        })
        .sort((previousItem, actualItem) => previousItem.updatedAt > actualItem.updatedAt ? -1 : (previousItem.updatedAt > actualItem.updatedAt) ? 1 : 0);

    return Promise.resolve(filteredAndSortedHistoryItems);
});

historyService.__setMockData = data => {
    mockData = data;
}

module.exports = historyService;