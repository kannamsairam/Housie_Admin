import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrownModalComponent } from './withdrown-modal.component';

describe('WithdrownModalComponent', () => {
  let component: WithdrownModalComponent;
  let fixture: ComponentFixture<WithdrownModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrownModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrownModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
