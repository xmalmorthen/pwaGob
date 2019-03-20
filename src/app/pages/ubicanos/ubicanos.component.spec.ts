import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicanosComponent } from './ubicanos.component';

describe('UbicanosComponent', () => {
  let component: UbicanosComponent;
  let fixture: ComponentFixture<UbicanosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicanosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
