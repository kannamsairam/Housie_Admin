import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestManagement } from './contests-management.component';

describe('ContestManagement', () => {
  let component: ContestManagement;
  let fixture: ComponentFixture<ContestManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestManagement ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
