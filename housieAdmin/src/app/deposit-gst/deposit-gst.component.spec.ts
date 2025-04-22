import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositGstComponent } from './deposit-gst.component';

describe('DepositGstComponent', () => {
  let component: DepositGstComponent;
  let fixture: ComponentFixture<DepositGstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositGstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositGstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
