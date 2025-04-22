import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusManagement } from './bonus-management.component';

describe('BonusManagement', () => {
  let component: BonusManagement;
  let fixture: ComponentFixture<BonusManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusManagement ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
