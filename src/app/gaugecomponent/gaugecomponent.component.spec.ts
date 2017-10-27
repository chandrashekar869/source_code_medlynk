import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugecomponentComponent } from './gaugecomponent.component';

describe('GaugecomponentComponent', () => {
  let component: GaugecomponentComponent;
  let fixture: ComponentFixture<GaugecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
