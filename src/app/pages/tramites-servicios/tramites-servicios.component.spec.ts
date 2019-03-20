import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesServiciosComponent } from './tramites-servicios.component';

describe('TramitesServiciosComponent', () => {
  let component: TramitesServiciosComponent;
  let fixture: ComponentFixture<TramitesServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramitesServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
