import { TestBed } from '@angular/core/testing';

import { GeoLicationService } from './geo-lication.service';

describe('GeoLicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoLicationService = TestBed.get(GeoLicationService);
    expect(service).toBeTruthy();
  });
});
