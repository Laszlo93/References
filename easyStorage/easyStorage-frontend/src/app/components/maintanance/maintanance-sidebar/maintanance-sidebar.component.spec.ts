import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintananceSidebarComponent } from './maintanance-sidebar.component';

describe('MaintananceSidebarComponent', () => {
  let component: MaintananceSidebarComponent;
  let fixture: ComponentFixture<MaintananceSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintananceSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintananceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
