import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdsModalComponent } from './tds-modal.component';

describe('TdsModalComponent', () => {
  let component: TdsModalComponent;
  let fixture: ComponentFixture<TdsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TdsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
