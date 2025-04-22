import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationModelComponent } from './notification-model.component';

describe('NotificationModelComponent', () => {
  let component: NotificationModelComponent;
  let fixture: ComponentFixture<NotificationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
