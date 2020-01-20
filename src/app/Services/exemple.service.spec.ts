import { TestBed } from '@angular/core/testing';

import { ExempleService } from './exemple.service';

describe('ExempleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExempleService = TestBed.get(ExempleService);
    expect(service).toBeTruthy();
  });
});
