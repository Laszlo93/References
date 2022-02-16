import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeatherComponent } from './calendar-weather.component';

describe('CalendarWeatherComponent', () => {
  let component: CalendarWeatherComponent;
  let fixture: ComponentFixture<CalendarWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
