import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementTable } from './management-table.component';

describe('ManagementTable', () => {
  let component: ManagementTable;
  let fixture: ComponentFixture<ManagementTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementTable ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
