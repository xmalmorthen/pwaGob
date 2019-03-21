import { TestBed } from '@angular/core/testing';

import { WsKioscosService } from './ws-kioscos.service';

describe('WsKioscosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WsKioscosService = TestBed.get(WsKioscosService);
    expect(service).toBeTruthy();
  });
});
