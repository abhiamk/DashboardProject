import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMatTableComponent } from './demo-mat-table.component';

describe('DemoMatTableComponent', () => {
  let component: DemoMatTableComponent;
  let fixture: ComponentFixture<DemoMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoMatTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
