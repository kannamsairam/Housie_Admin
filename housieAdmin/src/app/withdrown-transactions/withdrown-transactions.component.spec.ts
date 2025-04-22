import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrownTransactions } from './withdrown-transactions.component';

describe('WithdrownTransactions', () => {
  let component: WithdrownTransactions;
  let fixture: ComponentFixture<WithdrownTransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrownTransactions ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrownTransactions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
