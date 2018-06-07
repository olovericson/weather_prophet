import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecaseTableComponent } from './forecase-table.component';

describe('ForecaseTableComponent', () => {
  let component: ForecaseTableComponent;
  let fixture: ComponentFixture<ForecaseTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecaseTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
