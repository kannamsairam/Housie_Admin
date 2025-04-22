import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerManagement } from './banner-management.component';

describe('BannerManagement', () => {
  let component: BannerManagement;
  let fixture: ComponentFixture<BannerManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerManagement ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
