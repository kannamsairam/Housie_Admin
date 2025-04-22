import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWallet } from './user-wallet.component';

describe('UserWallet', () => {
  let component: UserWallet;
  let fixture: ComponentFixture<UserWallet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWallet ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWallet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
