import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleGaugesComponent } from './google-gauges.component';

describe('GoogleGaugesComponent', () => {
  let component: GoogleGaugesComponent;
  let fixture: ComponentFixture<GoogleGaugesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleGaugesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleGaugesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
