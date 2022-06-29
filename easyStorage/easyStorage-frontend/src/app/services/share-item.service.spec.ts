import { TestBed } from '@angular/core/testing';

import { ShareItemService } from './share-item.service';

describe('SiblingService', () => {
  let service: ShareItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
