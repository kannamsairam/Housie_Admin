import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuzeManagement } from './quiz-management.component';

describe('QuzeManagement', () => {
  let component: QuzeManagement;
  let fixture: ComponentFixture<QuzeManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuzeManagement ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuzeManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
