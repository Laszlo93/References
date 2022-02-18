import { TestBed } from '@angular/core/testing';

import { GoogleDirectionService } from './google-direction.service';

describe('GoogleDirectionService', () => {
  let service: GoogleDirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleDirectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
