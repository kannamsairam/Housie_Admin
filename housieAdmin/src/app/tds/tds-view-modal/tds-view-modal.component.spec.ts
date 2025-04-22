import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdsViewModalComponent } from './tds-view-modal.component';

describe('TdsViewModalComponent', () => {
  let component: TdsViewModalComponent;
  let fixture: ComponentFixture<TdsViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdsViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TdsViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
