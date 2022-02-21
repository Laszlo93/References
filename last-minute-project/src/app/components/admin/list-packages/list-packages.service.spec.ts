import { TestBed } from '@angular/core/testing';

import { ListPackagesService } from './list-packages.service';

describe('ListPackagesService', () => {
  let service: ListPackagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPackagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
