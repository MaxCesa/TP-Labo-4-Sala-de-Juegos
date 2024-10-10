import { TestBed } from '@angular/core/testing';

import { CountriesAPIService } from './countries-api.service';

describe('CountriesAPIService', () => {
  let service: CountriesAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
